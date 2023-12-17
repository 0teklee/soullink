import "./globals.css";
import Footer from "@/components/common/Footer";
import NextAuthSessionProvider from "@/components/common/module/NextAuthSessionProvider";
import Header from "@/components/common/header/Header";
import ReactQueryClientProvider from "@/components/common/react-query-provider/ReactQueryClientProvider";
import RecoilRootProvider from "@/components/common/module/RecoilRootProvider";
import CommonModalProvider from "@/components/common/modal/CommonModalProvider";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import { Noto_Sans } from "next/font/google";
import DarkModeContainer from "@/components/common/module/DarkModeContainer";

export const metadata = {
  title: "soullink",
  description: "souls linked up",
};

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSans.className}>
      <body>
        <RecoilRootProvider>
          <NextAuthSessionProvider>
            <ReactQueryClientProvider>
              <Header />
              <DarkModeContainer>
                <main
                  className={`xs:my-10 py-12 xs:py-2 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px] bg-white dark:bg-gray-600 dark:tw-font-dark`}
                >
                  <ReactQueryErrorBoundary isLayout={true}>
                    {children}
                  </ReactQueryErrorBoundary>
                </main>
              </DarkModeContainer>
              <Footer />
              <CommonModalProvider />
            </ReactQueryClientProvider>
          </NextAuthSessionProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
