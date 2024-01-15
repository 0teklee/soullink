import React, { ReactNode } from "react";
import Title from "@/components/common/module/Title";

const FallbackSection = ({
  children,
  title = "Loading",
}: {
  children: ReactNode | ReactNode[];
  title?: string;
}) => {
  return (
    <section className={`flex flex-col items-start gap-3 w-full `}>
      <Title size={`h1`} text={title} />
      {children}
    </section>
  );
};

export default FallbackSection;
