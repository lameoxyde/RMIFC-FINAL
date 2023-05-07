import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.scss";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";

import ColorSwitcher from "../common/elements/color-switcher/ColorSwitcher";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <center>
        <h1>
          <b>UNDER CONSTRUCTION</b>
        </h1>
      </center>

      <ColorSwitcher />
      <GoogleAnalytics
        measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
