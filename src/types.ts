import type { Keyboard, Toast } from "@raycast/api";
import type { ChatCompletionRequestMessageRoleEnum } from "openai";

export interface AskParams {
  question: string;
  model: string;
  conversationId: string;
  modelTone: ModelTone;
}
export type ModelTone = "creative" | "precise" | "balanced" | "default";
export interface Question {
  id: string;
  question: string;
  created_at: string;
}
export interface Chat extends Question {
  answer: string;
  model: string;
  conversationId: string;
  tone: ModelTone;
}
export interface Model {
  type: "gpt-3" | "gpt-3.5";
  name: string;
  max_tokens: number;
}
export interface Conversation {
  id: string;
  //   model: Model;
  chats: Chat[];
  updated_at: string;
  created_at: string;
  model: string;
}
export interface ChatHook {
  data: Chat[];
  setData: React.Dispatch<React.SetStateAction<Chat[]>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChatId: string | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>;
  ask: (params: AskParams) => Promise<void>;
  clear: () => Promise<void>;
}
export interface ChatListItemProps {
  chats: ChatHook;
  question: string;
  //   model: string;
  models: ModelHook;
  isInvalid: boolean;
  setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversation: Conversation;
}

export interface ModelHook {
  data: Model[];
  selectedModelName: string;
  setSelectedModelName: React.Dispatch<React.SetStateAction<string>>;
  maxModelTokens: number;
  maxTokenOffset: number;
  modelTone: ModelTone;
  setModelTone: React.Dispatch<React.SetStateAction<ModelTone>>;
}
export interface CreateChatCompletionDeltaResponse {
  id: string;
  object: "chat.completion.chunk";
  created: number;
  model: string;
  choices: [
    {
      delta: {
        role: "user" | "assistant" | "system";
        content?: string;
      };
      index: number;
      finish_reason: string | null;
    }
  ];
}

export interface CreateCompletionResponse {
  id: string;
  object: "text_completion";
  created: number;
  model: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: any;
      finish_reason: string | null;
    }
  ];
}
export interface PromptFormProps {
  initQuestion?: string;
  chats: ChatHook;
  models: ModelHook;
  conversation: Conversation;
}
export interface CopyToClipboardActionProps {
  question: string;
  answer: string;
}
export interface DestructiveActionProps {
  title: string;
  dialog: { title?: string; message?: string; primaryButton?: string };
  onAction: () => void;
  shortcut?: Keyboard.Shortcut;
}

export interface PrimaryActionProps {
  title: string;
  onAction: () => void;
}
export interface FormInputActionProps {
  question: string;
  chats: ChatHook;
  models: ModelHook;
  conversation: Conversation;
}

export interface AnswerDetailViewProps {
  chat: Chat;
  isHideMeta: boolean;
}

export interface HandleChatCompletion {
  conversation: {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
  }[];
  toast: Toast;
  chat: Chat;
  model: string;
  modelTone: ModelTone;
}

export interface HandleTextCompletion {
  question: string;
  toast: Toast;
  chat: Chat;
  model: string;
  modelTone: ModelTone;
}
