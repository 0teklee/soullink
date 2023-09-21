import "./globals.css";
import Footer from "@/components/common/Footer";
import NextAuthSessionProvider from "@/components/common/module/NextAuthSessionProvider";
import Header from "@/components/common/header/Header";
import ReactQueryClientProvider from "@/components/common/module/ReactQueryClientProvider";
import RecoilRootProvider from "@/components/common/module/RecoilRootProvider";

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
        <RecoilRootProvider>
          <NextAuthSessionProvider>
            <ReactQueryClientProvider>
              <Header />
              <main
                className={`xs:my-10 py-12 xs:py-2 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px] bg-white `}
              >
                {children}
              </main>
              <Footer />
            </ReactQueryClientProvider>
          </NextAuthSessionProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
