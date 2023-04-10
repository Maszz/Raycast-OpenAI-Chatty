import { model, default_model_token_offset, default_model } from "../../assets/model.json";
// import { Model } from "../type";
// import { modelList } from "../ModelData";
import { Model } from "../types";
import { ModelHook } from "../types";
import { List, LocalStorage, showToast, Toast } from "@raycast/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelTone } from "../types";
export const DEFAULT_MODEL_NAME = default_model;
export const DEFAULT_MODEL_TOKENS_OFFSET = default_model_token_offset;
export const modelList = model as Model[];
export const CHAT_COMPLETION_SUPPORT = ["gpt-3.5-turbo", "gpt-4"];
export type ModelParams = {
  temperature: number;
  top_p: number;
  presence_penalty: number;
  frequency_penalty: number;
};
export const ModelToneList = ["creative", "precise", "balanced", "default"] as ModelTone[];
export const ModelToneMap: Record<ModelTone, ModelParams> = {
  creative: {
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 1,
    frequency_penalty: 1,
  },
  precise: {
    temperature: 0.1,
    top_p: 1,
    presence_penalty: 0.5,
    frequency_penalty: 0.1,
  },
  balanced: {
    temperature: 0.7,
    top_p: 1,
    presence_penalty: 0.5,
    frequency_penalty: 0.3,
  },
  default: {
    temperature: 1,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  },
};

export const useModel = (selectedModel?: string): ModelHook => {
  const [data, setData] = useState<Model[]>(modelList);
  const [selectedModelName, setSelectedModelName] = useState<string>(selectedModel || DEFAULT_MODEL_NAME);
  const [maxModelTokens, setMaxModelTokens] = useState<number>(0);
  const [maxTokenOffset] = useState<number>(DEFAULT_MODEL_TOKENS_OFFSET);
  const [modelTone, setModelTone] = useState<ModelTone>("default");

  useEffect(() => {
    const select = data.find((model) => selectedModelName === model.name);
    if (select) {
      setMaxModelTokens(select.max_tokens);
    }
  }, [selectedModelName]);

  useEffect(() => {
    console.log("selectedModelName", selectedModelName, selectedModel);
  }, [selectedModelName]);

  return useMemo(
    () => ({ data, selectedModelName, setSelectedModelName, maxModelTokens, maxTokenOffset, modelTone, setModelTone }),
    [data, selectedModelName, setSelectedModelName, maxModelTokens, maxTokenOffset, modelTone, setModelTone]
  );
};
