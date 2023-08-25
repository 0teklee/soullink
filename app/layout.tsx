import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "soullink",
  description: "souls linked up",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main
          className={`xs:my-10 py-12 xs:py-2 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px]`}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
