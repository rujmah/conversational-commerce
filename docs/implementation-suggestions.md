# Conversational Commerce Implementation Suggestions

## Overview
This document outlines implementation approaches for building an AI-powered order status assistant with SSE endpoint and demo client using the Next.js boilerplate.

## Architecture Overview

### Backend (API Routes)
- **Next.js API Routes**: Leverage the existing Next.js structure for backend endpoints
- **Server-Sent Events (SSE)**: Stream AI responses for real-time conversation
- **OpenAI Integration**: GPT-4 with function calling for order status queries
- **GraphQL Client**: Apollo Client or similar for order status API integration

### Frontend (Demo Client)
- **Chat Interface**: Real-time chat UI using existing shadcn/ui components
- **Theme Support**: Dark/light mode integration with existing theme system
- **Responsive Design**: Mobile-first approach following project conventions

## Implementation Approach

### 1. Backend Implementation (`/src/app/api/`)

#### Core API Routes:
```
/api/chat/stream        # SSE endpoint for AI conversation
/api/orders/status      # GraphQL proxy for order status
/api/health            # Health check endpoint
```

#### Key Technologies:
- **AI SDK**: @ai-sdk/react for client-side hooks, ai for server-side streaming
- **GraphQL**: Apollo Client for order status queries
- **Validation**: Zod for input validation
- **Rate Limiting**: Consider implementing for production use

#### Order Status Tool Function:
```typescript
const orderStatusTool = {
  name: "get_order_status",
  description: "Fetch order status information",
  parameters: {
    type: "object",
    properties: {
      orderNumber: { type: "string" },
      email: { type: "string", format: "email" }
    },
    required: ["orderNumber", "email"]
  }
}
```

### 2. Frontend Implementation

#### Components Architecture:
```
src/components/
├── chat/
│   ├── chat-interface.tsx      # Main chat container with useChat hook
│   ├── message-list.tsx        # Messages display with status-based loading
│   └── message-input.tsx       # Input field with send button
├── order/
│   └── order-status-card.tsx   # Order info display
└── ui/ (existing shadcn components)
```

#### Key Features:
- **Real-time Streaming**: useChat hook with status-based loading states (`status === "submitted" || status === "streaming"`)
- **Message History**: Local state management for conversation
- **Order Display**: Structured order information presentation
- **Error Handling**: Graceful error states and retry mechanisms

### 3. Suggested File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── stream/
│   │   │       └── route.ts    # SSE chat endpoint
│   │   └── orders/
│   │       └── status/
│   │           └── route.ts    # GraphQL proxy
│   ├── chat/
│   │   └── page.tsx           # Chat demo page
│   └── layout.tsx             # Root layout (existing)
├── components/
│   ├── chat/                  # Chat components
│   └── ui/                    # Existing shadcn components
├── lib/
│   ├── ai.ts                  # OpenAI configuration
│   ├── graphql.ts             # GraphQL client setup
│   └── utils.ts               # Existing utilities
└── types/
    └── index.ts               # TypeScript definitions
```

## Technical Implementation Details

### 1. SSE Endpoint (`/api/chat/stream/route.ts`)
```typescript
export async function POST(request: Request) {
  const { messages } = await request.json()
  
  const stream = new ReadableStream({
    async start(controller) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        tools: [orderStatusTool],
        stream: true
      })
      
      for await (const chunk of completion) {
        // Stream chunks to client
        controller.enqueue(new TextEncoder().encode(
          `data: ${JSON.stringify(chunk)}\n\n`
        ))
      }
      
      controller.close()
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
```

### 2. GraphQL Integration
```typescript
// lib/graphql.ts
const ORDER_STATUS_QUERY = gql`
  query GetOrderStatus($orderNumber: String!, $email: String!) {
    order(orderNumber: $orderNumber, email: $email) {
      estimatedDeliveryDate
      aggregatedStatus
      trackingLink
      trackingNumber
    }
  }
`
```

### 3. Demo Client Features
- **Welcome Message**: Introduction to the assistant
- **Example Queries**: Pre-filled examples ("Where's my order R156998803?")
- **Order Status Display**: Formatted order information with tracking links
- **Error Handling**: User-friendly error messages
- **Mobile Optimization**: Following existing responsive patterns

## Dependencies to Add

```json
{
  "dependencies": {
    "@ai-sdk/openai": "^1.3.22",
    "@ai-sdk/react": "^1.2.12", 
    "ai": "^4.3.16",
    "@apollo/client": "^3.13.8",
    "graphql": "^16.11.0",
    "zod": "^3.25.67"
  }
}
```

## Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key
GRAPHQL_ENDPOINT=https://graphql-staging.on.com
```

## Testing Strategy

### Unit Tests
- API route handlers
- GraphQL query functions
- AI tool function execution
- Component rendering and interactions

### Integration Tests
- End-to-end chat flow
- Order status retrieval
- SSE connection handling
- Error scenarios

### Test Data
- Use provided test order: R156998803 / mobile.developer+22@on-running.com
- Mock GraphQL responses for consistent testing
- Test various order statuses and edge cases

## Deployment Considerations

### Free Hosting Options
1. **Vercel** (Recommended): Native Next.js support, edge functions
2. **Netlify**: Good Next.js integration, serverless functions
3. **Railway**: Simple deployment, database options
4. **Fly.io**: Docker deployment, global distribution

### Production Readiness
- Rate limiting for API endpoints
- Input validation and sanitization
- Error logging and monitoring
- CORS configuration for production domains
- Environment-specific configurations

## Next Steps

1. **Setup**: Install dependencies and configure environment variables
2. **Backend**: Implement SSE endpoint and GraphQL integration
3. **Frontend**: Build chat interface using existing UI components
4. **Testing**: Add comprehensive test coverage
5. **Deployment**: Deploy to chosen platform and test end-to-end
6. **Documentation**: Update README with setup and usage instructions

## Notes

- Leverages existing Next.js boilerplate structure and conventions
- Uses established shadcn/ui components for consistent styling
- Maintains existing theme support (dark/light mode)
- Follows project's TypeScript strict mode requirements
- Aligns with existing testing setup using Vitest

## Status Management

The chat interface uses the AI SDK's `status` values for managing loading states:

- **`"submitted"`** - Message sent to API, awaiting response stream start
- **`"streaming"`** - Response actively streaming from API  
- **`"ready"`** - Full response received, ready for new user message
- **`"error"`** - Error occurred during API request

**Loading Logic:** `isLoading = status === "submitted" || status === "streaming"`