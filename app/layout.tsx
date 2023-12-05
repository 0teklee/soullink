import "./globals.css";
import Footer from "@/components/common/Footer";
import NextAuthSessionProvider from "@/components/common/module/NextAuthSessionProvider";
import Header from "@/components/common/header/Header";
import ReactQueryClientProvider from "@/components/common/react-query-provider/ReactQueryClientProvider";
import RecoilRootProvider from "@/components/common/module/RecoilRootProvider";
import CommonModalProvider from "@/components/common/modal/CommonModalProvider";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

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
                <ReactQueryErrorBoundary isLayout={true}>
                  {children}
                </ReactQueryErrorBoundary>
              </main>
              <Footer />
              <CommonModalProvider />
            </ReactQueryClientProvider>
          </NextAuthSessionProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
