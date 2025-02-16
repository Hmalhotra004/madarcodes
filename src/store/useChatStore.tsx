import { v4 as uuiV4 } from "uuid";
import { create } from "zustand";

export type Chat = {
  id: string;
  message: string;
  byUser: "question" | "answer";
};

export interface ChatState {
  chats: Chat[];
  addMessage: (message: string, byUser: "question" | "answer") => void;
  getMessageId: (message: string) => string | undefined;
}

const useChatStore = create<ChatState>((set, get) => ({
  chats: [],

  addMessage: (message, byUser) =>
    set((state) => ({
      chats: [...state.chats, { id: uuiV4(), message, byUser }],
    })),

  getMessageId: (message) => {
    const chat = get().chats.find((chat) => chat.message === message);
    return chat ? chat.id : undefined;
  },
}));

export default useChatStore;
