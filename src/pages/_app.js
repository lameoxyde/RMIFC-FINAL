import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.scss";
import ColorSwitcher from "../common/elements/color-switcher/ColorSwitcher";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ColorSwitcher />
      <AnimatePresence mode="popLayout" initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
