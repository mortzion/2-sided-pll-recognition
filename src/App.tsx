import { isNil, random, sample } from "lodash";
import { useState, useRef, useEffect } from "react";
import { PLL, PLLS, RecognitionFeature } from "./core/plls";
import { TwistyPlayer } from "cubing/twisty";
import { Alg } from "cubing/alg";
import { SettingsModal } from "./ui/settings-modal";
import { useConfig } from "./ui/state/config";
import { Guess } from "./ui/guess";
import { pllGuessableNameForDifficulty } from "./core/utils";

const IR = { facelets: new Array(6).fill("regular").fill("ignored", 0, 1) };
const I = { facelets: new Array(6).fill("ignored") };

function useGuess(pll?: PLL) {
  const { config } = useConfig();

  const [guessed, setGuessed] = useState<string>();
  const [guesses, setGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  function onGuess(guess: string) {
    if (!guessed && pll) {
      setGuessed(guess);
      setGuesses(guesses + 1);

      if (pllGuessableNameForDifficulty(pll, config.difficulty) === guess) {
        setCorrectGuesses(correctGuesses + 1);
      }
    }
  }

  function resetGuess() {
    setGuessed(undefined);
  }

  function resetAll() {
    setGuessed(undefined);
    setGuesses(0);
    setCorrectGuesses(0);
  }

  return {
    guessed,
    guesses,
    correctGuesses,
    onGuess,
    resetAll,
    resetGuess,
  };
}

function App() {
  const divRef = useRef<HTMLDivElement>(null);
  const { config } = useConfig();
  const [pll, setPll] = useState<PLL>();
  const { guessed, guesses, correctGuesses, onGuess, resetGuess, resetAll } = useGuess(pll);

  useEffect(() => {
    resetAll();
    setPll(undefined);
    divRef.current!.innerHTML = "";
    const player = new TwistyPlayer({
      experimentalSetupAlg: "z2",
      hintFacelets: "none",
      controlPanel: "none",
      visualization: "PG3D",
      experimentalDragInput: "none",
      experimentalStickeringMaskOrbits: {
        orbits: {
          EDGES: {
            pieces: [I, I, I, I, IR, IR, IR, IR, I, I, I, I],
          },
          CORNERS: {
            pieces: [I, I, I, I, IR, IR, IR, IR],
          },
          CENTERS: {
            pieces: [I, I, I, I, I, I],
          },
        },
      },
      background: "none",
    });
    divRef.current?.appendChild(player);
  }, [config]);

  function generateScramble(pll: PLL, feature: RecognitionFeature): Alg {
    const prefix = "z2 U" + random(1, 16);
    const suffix = sample(pll.recognition[feature])!;

    return new Alg(prefix).concat(new Alg(pll.alg).invert()).concat(suffix);
  }

  function onNext() {
    const desiredFeature = sample(config.recognitionFeatures)!;
    const pllsWithDesiredFeature = PLLS.filter((pll) => desiredFeature in pll.recognition);
    const pllWithDesiredFeature = sample(pllsWithDesiredFeature);

    if (!pllWithDesiredFeature) {
      return;
    }

    divRef.current!.innerHTML = "";
    const player = new TwistyPlayer({
      experimentalSetupAlg: generateScramble(pllWithDesiredFeature, desiredFeature),
      hintFacelets: "none",
      controlPanel: "none",
      visualization: "PG3D",
      experimentalDragInput: "none",
      experimentalStickeringMaskOrbits: {
        orbits: {
          EDGES: {
            pieces: [I, I, I, I, IR, IR, IR, IR, I, I, I, I],
          },
          CORNERS: {
            pieces: [I, I, I, I, IR, IR, IR, IR],
          },
          CENTERS: {
            pieces: [I, I, I, I, I, I],
          },
        },
      },
      background: "none",
    });
    divRef.current?.appendChild(player);

    setPll(pllWithDesiredFeature);
    resetGuess();
  }

  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <span className="text-2xl">2 Sided PLL Recognition</span>
        </div>
        <div className="flex-none">
          <SettingsModal />
        </div>
      </div>
      <p className="text-center text-xl">
        {correctGuesses}/{guesses}
      </p>
      <span ref={divRef} className="flex justify-center"></span>
      <div className="flex justify-center my-5">
        <button className="btn" onClick={onNext} disabled={pll && isNil(guessed)}>
          Next
        </button>
      </div>
      <Guess difficulty={config.difficulty} pll={pll} guessed={guessed} onGuess={onGuess} />
    </div>
  );
}

export default App;
