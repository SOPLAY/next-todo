import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  // server side 에서 실행됩나.
  // HTML에 직접 수정 사항을 적용하려 할 때 작성하시면 됩니다.
  // 주로 Head 에 title 등을 추가할 때 사용하게 됩니다.
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
