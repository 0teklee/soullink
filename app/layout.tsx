import "./globals.css";
import Footer from "@/components/common/Footer";
import NextAuthSessionProvider from "@/components/common/module/NextAuthSessionProvider";
import ReactQueryClientProvider from "@/components/common/react-query-provider/ReactQueryClientProvider";
import CommonModalProvider from "@/components/common/modal/CommonModalProvider";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import { Noto_Sans_KR } from "next/font/google";
import AuthUserNavigator from "@/components/common/module/AuthUserNavigator";
import { clsx } from "clsx";
import Header from "@/components/common/header/Header";
import DarkModeContainer from "@/components/common/module/DarkModeContainer";

export const metadata = {
  title: "soullink - beta",
  description: "share your playlists",
};

const ibmPlexSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSansKr.className}>
      <head>
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION}
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <NextAuthSessionProvider>
          <ReactQueryClientProvider>
            <DarkModeContainer>
              <Header />
              <main
                className={clsx(
                  "min-h-screen",
                  "my-10 py-12 pt-4 pb-12 sm:px-4 lg:px-24 desktop:px-48",
                  "overflow-x-hidden",
                  "bg-white dark:bg-black dark:text-gray-50 dark:[&__input]:text-gray-700 dark:[&__textarea]:text-gray-700",
                )}
              >
                <ReactQueryErrorBoundary isLayout={true}>
                  {children}
                </ReactQueryErrorBoundary>
              </main>
              <Footer />
              <AuthUserNavigator />
              <CommonModalProvider />
            </DarkModeContainer>
          </ReactQueryClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
