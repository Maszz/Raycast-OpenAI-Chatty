import { encode } from "../libs/encoder";
import { Chat, ModelTone, Question } from "../types";
import { getPreferenceValues } from "@raycast/api";
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from "openai";
import type { ChatCompletionRequestMessage } from "openai";
import { useCallback, useMemo, useState } from "react";
import { ModelToneMap } from "./useModel";
import { usePreference } from "./usePreference";
export const useOpenAi = () => {
  const apiKey = usePreference<string>("openAiApiKey");
  const [openAi] = useState(() => {
    const config = new Configuration({ apiKey });
    return new OpenAIApi(config);
  });

  const chatCompletion = async (
    messages: { role: ChatCompletionRequestMessageRoleEnum; content: string }[],
    useStream: boolean,
    model: string,
    modelTone: ModelTone
  ) => {
    const { temperature, top_p, presence_penalty, frequency_penalty } = ModelToneMap[modelTone];
    const res = await openAi.createChatCompletion(
      {
        model: model,
        // temperature: 1,
        messages: messages,
        stream: useStream,
        temperature,
        top_p,
        presence_penalty,
        frequency_penalty,
      },
      {
        responseType: useStream ? "stream" : undefined,
      }
    );
    return res;
  };

  const textCompletion = async (prompt: string, model: string, useStream: boolean, modelTone: ModelTone) => {
    const { temperature, top_p, presence_penalty, frequency_penalty } = ModelToneMap[modelTone];

    const res = await openAi.createCompletion(
      {
        model: model,
        prompt: prompt,
        stream: useStream,
        temperature,
        top_p,
        presence_penalty,
        frequency_penalty,
      },
      {
        responseType: useStream ? "stream" : undefined,
      }
    );
    return res;
  };

  const chatTransformer = (chat: Chat[]) => {
    const prompt = "You are a helpful assistant."; // default prompt

    const messages: ChatCompletionRequestMessage[] = [{ role: "system", content: prompt }];
    const limitedChat = limitConversationLength(chat);
    limitedChat.forEach(({ question, answer }) => {
      messages.push({ role: "user", content: question });
      messages.push({
        role: "assistant",
        content: answer,
      });
    });
    return messages;
  };

  const limitConversationLength = (chats: Chat[]) => {
    // https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
    const maxTokens = 3750;
    const newChats: Chat[] = [];
    let tokens = 0;

    for (const chat of chats) {
      const questionTokens = encode(chat.question).length;
      const answerTokens = encode(chat.answer).length;

      tokens = tokens + questionTokens + answerTokens;

      if (tokens > maxTokens) {
        break;
      }

      newChats.push(chat);
    }

    return newChats;
  };

  const prepairPayload = (chats: Chat[], question: string) => {
    const messagesParams = chatTransformer(chats);
    const params: {
      role: ChatCompletionRequestMessageRoleEnum;
      content: string;
    } = { role: "user", content: question };

    return [...messagesParams, params];
  };

  return { openAi, chatCompletion, chatTransformer, prepairPayload, textCompletion };
};
