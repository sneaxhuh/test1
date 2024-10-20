import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { TOKEN_ICO_Provider } from "../context/index";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TOKEN_ICO_Provider>
        <Component {...pageProps} />
        <Toaster />
      </TOKEN_ICO_Provider>

      {/* Load external scripts */}
      <Script src="assets/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
      <Script src="assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      <Script src="assets/js/wow.min.js" strategy="beforeInteractive" />
      <Script src="assets/js/appear.js" strategy="lazyOnload" />
      <Script src="assets/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="assets/js/metisMenu.min.js" strategy="lazyOnload" />
      <Script src="assets/js/jquery.marquee.min.js" strategy="lazyOnload" />
      <Script src="assets/js/parallax-scroll.js" strategy="lazyOnload" />
      <Script src="assets/js/countdown.js" strategy="lazyOnload" />
      <Script src="assets/js/easing.min.js" strategy="lazyOnload" />
      <Script src="assets/js/scrollspy.js" strategy="lazyOnload" />
      <Script src="assets/js/main.js" strategy="lazyOnload" />
    </>
  );
}
