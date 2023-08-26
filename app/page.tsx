import { Inter } from "next/font/google";
import MainTemplate from "@/components/main/MainTemplate";

const inter = Inter({ subsets: ["latin"] });

// api 함수

export default function Home() {
  return (
    <section className={`py-6`}>
      <MainTemplate />
    </section>
  );
}
