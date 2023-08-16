import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// api 함수

export default function Home() {
  return (
    <section className={`bg-white h-auto`}>
      <div className={`flex items-center justify-center`}>
        <h1 className={`text-2xl font-bold text-gray-900`}>Main Page</h1>
      </div>
    </section>
  );
}
