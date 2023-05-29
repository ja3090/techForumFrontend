import type { AppProps } from "next/app";
import SSRProvider from "react-bootstrap/SSRProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SSRProvider>
  );
}
