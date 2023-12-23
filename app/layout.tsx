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
import AuthUserNavigator from "@/components/common/module/AuthUserNavigator";

export const metadata = {
  title: "soullink - beta",
  description: "share your playlists",
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
      <head>
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION}
        />
      </head>
      <body>
        <RecoilRootProvider>
          <NextAuthSessionProvider>
            <ReactQueryClientProvider>
              <Header />
              <DarkModeContainer>
                <main
                  className={`min-h-screen xs:my-10 py-12 xs:pt-4 xs:pb-12 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px] bg-white dark:bg-gray-600 dark:text-warmGray-50 dark:[&__input]:text-gray-700 dark:[&__textarea]:text-gray-700`}
                >
                  <ReactQueryErrorBoundary isLayout={true}>
                    {children}
                  </ReactQueryErrorBoundary>
                </main>
              </DarkModeContainer>
              <Footer />
              <AuthUserNavigator />
              <CommonModalProvider />
            </ReactQueryClientProvider>
          </NextAuthSessionProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
