import React from "react";

const Title = ({
  size,
  text,
}: {
  size: "h1" | "h2" | "h3" | "h4";
  text: string;
}) => {
  const isH1 = size === "h1";
  const isH2 = size === "h2";
  const isH3 = size === "h3";
  const isH4 = size === "h4";

  return (
    <>
      {isH1 && (
        <h1 className={`text-start text-gray-900 text-3xl font-bold`}>
          {text}
        </h1>
      )}
      {isH2 && (
        <h2 className={`mb-1 text-gray-900 text-xl font-semibold`}>{text}</h2>
      )}
      {isH3 && (
        <h3 className={`mb-1 text-xl text-gray-700 font-medium`}>{text}</h3>
      )}
      {isH4 && (
        <h4 className={`text-base text-gray-700 font-medium`}>{text}</h4>
      )}
    </>
  );
};

export default Title;
