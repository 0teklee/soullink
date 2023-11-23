import React from "react";
import { formatInputText } from "@/libs/utils/client/formatter";

const DomPurifiedText = ({ text }: { text: string }) => {
  const purified = formatInputText(text);
  return <div dangerouslySetInnerHTML={{ __html: purified }} />;
};

export default DomPurifiedText;
