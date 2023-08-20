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
        <main className={`my-12 xs:my-10`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
