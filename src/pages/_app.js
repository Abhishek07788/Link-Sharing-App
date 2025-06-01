import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="app-container">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
