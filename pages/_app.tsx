import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

// font 주입
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  // 리액트 컴포넌트 들은 여기서 사전 처리를 하면 됩니다.

  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
