import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.scss";
import ColorSwitcher from "../common/elements/color-switcher/ColorSwitcher";
import { GoogleAnalytics } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <center>
        <h1>
          <b style={{ "background-color": "red" }}>UNDER CONSTRUCTION</b>
        </h1>
      </center>
      <GoogleAnalytics trackPageViews />

      <ColorSwitcher />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
