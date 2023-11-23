import classNames from "classnames";

export type Color = "green" | "blue" | "red" | "orange" | "gray";

export interface ColorVisualizationProps {
  colors: Color[];
  highlights: number[];
}

const BACKGROUND: Record<Color, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  gray: "bg-gray-400",
};

export function ColorVisualization(props: ColorVisualizationProps) {
  return (
    <span className="flex">
      {props.colors.map((color, index) => (
        <span
          key={index}
          className={classNames(`${BACKGROUND[color]} border-4`, {
            "border-gray-300": !props.highlights.includes(index),
            "border-gray-700": props.highlights.includes(index),
          })}
          style={{ width: 30, height: 30 }}
        ></span>
      ))}
    </span>
  );
}
