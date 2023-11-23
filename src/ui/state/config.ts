import { atom, useAtom } from "jotai";
import { RecognitionFeature } from "../../core/plls";
import { without } from "lodash";

export type RecognitionDifficulty = "simple" | "specific";

export interface Config {
  recognitionFeatures: RecognitionFeature[];
  difficulty: RecognitionDifficulty;
}

const configAtom = atom<Config>({
  recognitionFeatures: Object.values(RecognitionFeature),
  difficulty: "specific",
});

export function useConfig() {
  const [config, setConfig] = useAtom(configAtom);

  function toggleRecognitionFeature(feature: RecognitionFeature) {
    if (config.recognitionFeatures.includes(feature)) {
      setConfig({
        ...config,
        recognitionFeatures: without(config.recognitionFeatures, feature),
      });
    } else {
      setConfig({
        ...config,
        recognitionFeatures: [...config.recognitionFeatures, feature],
      });
    }
  }

  function toggleDifficulty() {
    setConfig({ ...config, difficulty: config.difficulty === "simple" ? "specific" : "simple" });
  }

  return {
    config,
    toggleDifficulty,
    toggleRecognitionFeature,
  };
}
