# Conversational Commerce (Backend)

## Objective

Develop an AI agent to assist customers with order status inquiries.

## Requirements

1. Implement an AI agent with a tool to fetch order status from GraphQL gateway.
  a. Customers must be able to ask “where’s my order”.
2. Deploy the agent to any free cloud providers like Heroku, or Fly where it can be consumed via a Server-Sent-Event (SSE) endpoint.

## Resources

Order Status GraphQL API

● Endpoint: https://graphql-staging.on.com
● Required variables: Order number, email
● Query fields:
  ○ estimatedDeliveryDate
  ○ aggregatedStatus
  ○ trackingLink
  ○ trackingNumber
● Test Order:
  ○ Order number: R156998803
  ○ Email: mobile.developer+22@on-running.com

OpenAI API Key

Will be communicated separately.

## Deliverables

1. GitHub repository with the code.
2. SSE endpoint where the agent can be consumed.