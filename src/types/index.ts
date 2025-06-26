export interface OrderStatus {
  estimatedDeliveryDate?: string;
  aggregatedStatus: string;
  trackingLink?: string;
  trackingNumber?: string;
}

export interface OrderStatusRequest {
  orderNumber: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  orderData?: OrderStatus;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string;
}
