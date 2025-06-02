import Header from "@/components/Header";
import AuthProvider from "@/context/authProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  
  return (
    <div className="app-container">
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
