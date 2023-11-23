import { useRef } from "react";
import { RecognitionFeature } from "../../core/plls";
import { useConfig } from "../state/config";
import { ColorVisualization, ColorVisualizationProps } from "./color-visualization";

const HINTS: Record<RecognitionFeature, ColorVisualizationProps> = {
  completedFace: { colors: ["green", "green", "green", "gray", "gray", "gray"], highlights: [0, 1, 2] },
  doubleHeadlights: { colors: ["green", "gray", "green", "orange", "gray", "orange"], highlights: [0, 2, 3, 5] },
  headlightsAndBlock: { colors: ["green", "gray", "green", "orange", "orange", "gray"], highlights: [0, 2, 3, 4] },
  loneHeadlights: { colors: ["green", "gray", "green", "gray", "gray", "gray"], highlights: [0, 2] },
  doubleBlocks: { colors: ["green", "green", "gray", "gray", "orange", "orange"], highlights: [0, 1, 4, 5] },
  outsideBlock: { colors: ["green", "green", "gray", "gray", "gray", "gray"], highlights: [0, 1] },
  insideBlock: { colors: ["gray", "green", "green", "gray", "gray", "gray"], highlights: [1, 2] },
  bookends: { colors: ["green", "gray", "gray", "gray", "gray", "green"], highlights: [0, 5] },
  noBookends: { colors: ["green", "gray", "gray", "gray", "gray", "orange"], highlights: [0, 5] },
};

const RECOGNITION_FEATURES: Record<RecognitionFeature, string> = {
  completedFace: "Completed face",
  doubleHeadlights: "Double headlights",
  headlightsAndBlock: "Headlights and a block",
  loneHeadlights: "Lone headlights",
  doubleBlocks: "Double blocks",
  outsideBlock: "Outside block",
  insideBlock: "Inside block",
  bookends: "Bookends",
  noBookends: "No bookends",
};

export function SettingsModal() {
  const modalRef = useRef(null);
  const { config, toggleDifficulty, toggleRecognitionFeature } = useConfig();

  function isRecognitionFeatureEnabled(feature: RecognitionFeature) {
    return config.recognitionFeatures.includes(feature);
  }

  return (
    <>
      <button className="btn btn-neutral" onClick={() => modalRef.current?.showModal()}>
        Settings
      </button>
      <dialog id="settings_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Settings</h3>
          <h4 className="text-xl mb-4">Recognition features</h4>
          <div className="grid grid-cols-2 mb-6">
            {Object.values(RecognitionFeature).map((feature) => (
              <div className="flex">
                <label className="cursor-pointer label">
                  <input
                    id={`settings-checkbox-${feature}`}
                    type="checkbox"
                    value={feature}
                    checked={isRecognitionFeatureEnabled(feature)}
                    onChange={(event) => toggleRecognitionFeature(event.target.value as RecognitionFeature)}
                    className="checkbox"
                  />
                  <span className="label-text ml-2">{RECOGNITION_FEATURES[feature]}</span>
                </label>
              </div>
            ))}
          </div>
          <h4 className="text-xl mb-4">Difficulty</h4>
          <label className="label cursor-pointer">
            <span className="label-text">Specific recognition</span>
            <input type="checkbox" className="toggle" checked={config.difficulty === "specific"} onChange={toggleDifficulty} />
          </label>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
