import { RecognitionDifficulty } from "../ui/state/config";
import { PLL } from "./plls";

export function pllGuessableNameForDifficulty(pll: PLL, difficulty: RecognitionDifficulty) {
  return difficulty === "simple" ? pll.broadName : pll.name;
}
