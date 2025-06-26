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
    console.log("🔧 SSE Tool: getOrderStatus called with:", {
      orderNumber,
      email,
    });

    try {
      const orderData = await getOrderStatus({ orderNumber, email });
      console.log("📦 SSE Tool: Order data retrieved:", orderData);

      if (!orderData) {
        const result = {
          success: false,
          message:
            "Order not found. Please check your order number and email address.",
        };
        console.log("❌ SSE Tool: Order not found, returning:", result);
        return result;
      }

      const result = {
        success: true,
        order: orderData,
      };
      console.log("✅ SSE Tool: Order found, returning:", result);
      return result;
    } catch (error) {
      const result = {
        success: false,
        message:
          "Sorry, I encountered an error while looking up your order. Please try again.",
      };
      console.log(
        "💥 SSE Tool: Error occurred, returning:",
        result,
        "Error:",
        error,
      );
      return result;
    }
  },
});

export async function POST(req: Request) {
  console.log("🌊 SSE: Starting Server-Sent Events stream");

  const { message } = await req.json();
  console.log("🔍 SSE: Received message:", message);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial connection event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "connected", message: "AI assistant connected" })}\n\n`,
          ),
        );

        // Send typing indicator
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "typing", message: "AI is thinking..." })}\n\n`,
          ),
        );

        // Process with OpenAI
        const result = await streamText({
          model: openai("gpt-4"),
          messages: [{ role: "user", content: message }],
          tools: {
            getOrderStatus: orderStatusTool,
          },
          maxSteps: 5,
          system: `You are a helpful customer service assistant for an e-commerce company. 
          
          Your main job is to help customers with order status inquiries. When a customer asks about their order:
          1. Extract the order number and email from their message if provided
          2. If missing information, politely ask for both the order number and email address
          3. Use the getOrderStatus tool to fetch their order information
          4. ALWAYS provide a friendly, conversational response interpreting the order details for the customer
          
          IMPORTANT: After using any tool, you MUST always respond with text explaining the results in a helpful, human way.
          
          Be conversational and empathetic. If an order isn't found, suggest they double-check their information or contact customer service.
          
          Example order for testing: R156998803 with email mobile.developer+22@on-running.com`,
        });

        // Stream the response
        for await (const chunk of result.textStream) {
          console.log("📡 SSE: Streaming chunk:", chunk);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`,
            ),
          );
        }

        // Send completion event
        const finalResult = await result;
        console.log("✅ SSE: Stream completed:", {
          text: finalResult.text,
          toolCalls: (await finalResult.toolCalls)?.length || 0,
        });

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "completed",
              message: "Response completed",
              fullText: finalResult.text,
              toolCallsUsed: (await finalResult.toolCalls)?.length || 0,
            })}\n\n`,
          ),
        );

        // Send final done event
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      } catch (error) {
        console.error("💥 SSE: Error during streaming:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "error",
              message: "An error occurred while processing your request",
            })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
