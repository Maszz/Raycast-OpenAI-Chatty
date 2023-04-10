import { encode } from "../libs/encoder";
import { Chat } from "../types";
import { ActionPanel, getPreferenceValues, List, showToast, useNavigation, Toast, clearSearchBar } from "@raycast/api";
import type { AnswerDetailViewProps } from "../types";

import { FC } from "react";
import { AnswerMeta } from "./AnswerMeta";
export const AnswerDetailView: FC<AnswerDetailViewProps> = ({ chat, isHideMeta }) => {
  const questionToken = encode(chat.question).length;
  const answerToken = encode(chat.answer).length;
  return (
    <List.Item.Detail
      markdown={`**${chat.question}**\n\n${chat.answer}`}
      metadata={
        isHideMeta ? null : (
          <AnswerMeta
            chat={chat}
            questionToken={questionToken.toLocaleString()}
            answerToken={answerToken.toLocaleString()}
            sumToken={(answerToken + questionToken).toLocaleString()}
            date={new Date(chat.created_at).toLocaleString()}
          />
        )
      }
    />
  );
};
