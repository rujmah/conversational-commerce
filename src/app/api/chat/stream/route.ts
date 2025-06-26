import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { getOrderStatus } from "@/lib/graphql";

const orderStatusTool = tool({
  description: "Get order status information for a customer",
  parameters: z.object({
    orderNumber: z.string().describe("The order number to look up"),
    email: z.string().email().describe("The customer email address"),
  }),
  execute: async ({ orderNumber, email }) => {
    console.log("🔧 Tool: getOrderStatus called with:", { orderNumber, email });

    try {
      const orderData = await getOrderStatus({ orderNumber, email });
      console.log("📦 Tool: Order data retrieved:", orderData);

      if (!orderData) {
        const result = {
          success: false,
          message:
            "Order not found. Please check your order number and email address.",
        };
        console.log("❌ Tool: Order not found, returning:", result);
        return result;
      }

      const result = {
        success: true,
        order: orderData,
      };
      console.log("✅ Tool: Order found, returning:", result);
      return result;
    } catch (error) {
      const result = {
        success: false,
        message:
          "Sorry, I encountered an error while looking up your order. Please try again.",
      };
      console.log(
        "💥 Tool: Error occurred, returning:",
        result,
        "Error:",
        error,
      );
      return result;
    }
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("🔍 API: Received messages:", JSON.stringify(messages, null, 2));

  const result = await streamText({
    model: openai("gpt-4"),
    messages,
    tools: {
      getOrderStatus: orderStatusTool,
    },
    maxSteps: 5,
    onStepFinish: (step) => {
      console.log("🚶 API: Step finished:", {
        stepType: step.stepType,
        text: step.text,
        toolCalls: step.toolCalls,
        toolResults: step.toolResults,
      });
    },
    system: `You are a helpful customer service assistant for an e-commerce company. 
    
    Your main job is to help customers with order status inquiries. When a customer asks about their order:
    1. Extract the order number and email from their message if provided
    2. If missing information, politely ask for both the order number and email address
    3. Use the getOrderStatus tool to fetch their order information
    4. ALWAYS provide a friendly, conversational response interpreting the order details for the customer
    
    IMPORTANT: After using any tool, you MUST always respond with text explaining the results in a helpful, human way. Never just use tools without providing a text response.
    
    Be conversational and empathetic. If an order isn't found, suggest they double-check their information or contact customer service.
    
    Example order for testing: R156998803 with email mobile.developer+22@on-running.com`,

    onFinish: (result) => {
      console.log("✅ API: Stream finished:", {
        text: result.text,
        textLength: result.text.length,
        toolCalls: result.toolCalls,
        toolCallsCount: result.toolCalls?.length || 0,
        usage: result.usage,
      });

      if (result.text.length === 0 && result.toolCalls?.length > 0) {
        console.log("⚠️ API: Only tool calls, no text generated");
        console.log(
          "🔧 Tool calls details:",
          JSON.stringify(result.toolCalls, null, 2),
        );
      }
    },
  });

  return result.toDataStreamResponse();
}
