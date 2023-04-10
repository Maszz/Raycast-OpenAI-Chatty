import { List } from "@raycast/api";
import { FC } from "react";
import type { AnswerMetaProps } from "../types";
export const AnswerMeta: FC<AnswerMetaProps> = ({ chat, answerToken, questionToken, sumToken, date }) => {
  return (
    <List.Item.Detail.Metadata>
      <List.Item.Detail.Metadata.TagList title="Model">
        <List.Item.Detail.Metadata.TagList.Item text={chat.model} color={"#eed535"} />
      </List.Item.Detail.Metadata.TagList>
      <List.Item.Detail.Metadata.Label title={"Tone"} icon="model" text={chat.tone} />
      <List.Item.Detail.Metadata.Label title={"Date"} text={date} />
      <List.Item.Detail.Metadata.Label title={"Question Token Count"} icon="model" text={questionToken} />
      <List.Item.Detail.Metadata.Label title={"Answer Token Count"} icon="model" text={answerToken} />
      <List.Item.Detail.Metadata.Label title={"Total Token Count"} icon="model" text={sumToken} />
      <List.Item.Detail.Metadata.Separator />
      <List.Item.Detail.Metadata.Label title={"Id"} text={chat.id} />
      <List.Item.Detail.Metadata.Label title={"Conversaton Id"} text={chat.conversationId} />
    </List.Item.Detail.Metadata>
  );
};
