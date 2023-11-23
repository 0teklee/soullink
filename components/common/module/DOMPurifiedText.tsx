import React from "react";
import { sanitize } from "isomorphic-dompurify";

const DomPurifiedText = ({ text }: { text: string }) => {
  const purified = sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: purified }} />;
};

export default DomPurifiedText;
