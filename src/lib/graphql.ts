import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import type { OrderStatus, OrderStatusRequest } from "@/types";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || "",
  cache: new InMemoryCache(),
});

const ORDER_STATUS_QUERY = gql`
  query GetOrderStatus($orderNumber: String!, $email: String!) {
    order(orderNumber: $orderNumber, email: $email) {
      estimatedDeliveryDate
      aggregatedStatus
      trackingLink
      trackingNumber
    }
  }
`;

export async function getOrderStatus({
  orderNumber,
  email,
}: OrderStatusRequest): Promise<OrderStatus | null> {
  console.log("🔍 GraphQL: Fetching order status for:", { orderNumber, email });

  try {
    const { data } = await client.query({
      query: ORDER_STATUS_QUERY,
      variables: { orderNumber, email },
      fetchPolicy: "network-only",
    });

    console.log("✅ GraphQL: Received data:", JSON.stringify(data, null, 2));
    return data?.order || null;
  } catch (error) {
    console.error("❌ GraphQL: Error fetching order status:", error);
    throw new Error("Failed to fetch order status");
  }
}
