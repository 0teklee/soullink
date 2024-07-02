import React from "react";

const Title = ({
  size,
  text,
  customColor,
}: {
  size: "h1" | "h2" | "h3" | "h4";
  text: string;
  customColor?: string;
}) => {
  const isH1 = size === "h1";
  const isH2 = size === "h2";
  const isH3 = size === "h3";
  const isH4 = size === "h4";
  const colorSet = () => {
    if (customColor) {
      return ``;
    }
    if (isH1 || isH2) {
      return "text-gray-900 dark:text-gray-50";
    }
    return "text-gray-700 dark:text-gray-50";
  };

  const color = colorSet();

  return (
    <>
      {isH1 && (
        <h1 className={`text-start ${color} text-3xl font-bold`}>{text}</h1>
      )}
      {isH2 && (
        <h2 className={`mb-1 ${color} text-xl font-semibold`}>{text}</h2>
      )}
      {isH3 && <h3 className={`mb-1 text-xl ${color} font-medium`}>{text}</h3>}
      {isH4 && <h4 className={`text-base ${color} font-medium`}>{text}</h4>}
    </>
  );
};

export default Title;
