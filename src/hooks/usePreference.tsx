import { useState } from "react";
import { getPreferenceValues } from "@raycast/api";
import type { Preference, PreferenceKey } from "../types";
export const usePreference = <T extends Preference[keyof Preference]>(key: PreferenceKey): T => {
  const [preference] = useState<Preference>(() => {
    const preference = getPreferenceValues<Preference>();
    return {
      openAiApiKey: preference.openAiApiKey || "",
      useStream: preference.useStream || false,
    };
  });
  return preference[key] as T;
};
