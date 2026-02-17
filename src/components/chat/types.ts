export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const MAX_MESSAGES = 10;
