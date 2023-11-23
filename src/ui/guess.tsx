import { uniq } from "lodash";
import { PLL, PLLS } from "../core/plls";
import { RecognitionDifficulty } from "./state/config";
import classNames from "classnames";

interface Props {
  difficulty: RecognitionDifficulty;
  pll?: PLL;
  guessed?: string;
  onGuess: (guess: string) => void;
}

export function Guess(props: Props) {
  const pllsToGuess = uniq(PLLS.map((pll) => getPllNameToUse(pll)!));
  const correctGuess = getPllNameToUse(props.pll);

  function getPllNameToUse(pll?: PLL) {
    return props.difficulty === "simple" ? pll?.broadName : pll?.name;
  }

  console.log({ correctGuess, guessed: props.guessed });

  return (
    <div className="flex justify-center gap-3 flex-wrap max-w-lg mx-auto">
      {pllsToGuess.map((pll) => (
        <button
          className={classNames("btn btn-square", {
            "btn-success": props.guessed && correctGuess === pll,
            "btn-error": props.guessed !== correctGuess && props.guessed === pll,
          })}
          onClick={() => props.onGuess(pll)}
        >
          {pll}
        </button>
      ))}
    </div>
  );
}
