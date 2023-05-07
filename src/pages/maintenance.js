import Image from "next/image";
import Link from "next/link";
import SocialData from "../data/social/SocialData.json";
// import HeadTitle from "../common/elements/head/HeadTitle";
import logo from "../../public/images/logo/rmifc.jpg";
import maintenance from "../../public/images/others/underconstruction.jpg";
const Maintenance = () => {
  if (typeof window !== "undefined") {
    var colorMode = window.localStorage.getItem("color-mode");
  }

  return (
    <>
      {/* <HeadTitle pageTitle="Coming Soon"/> */}
      <div className="maintanence-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="order-2 order-lg-1 col-lg-6 mt_md--40 mt_sm--40">
              <div className="content">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <Image
                        className="dark-logo"
                        width={225}
                        height={225}
                        src={(colorMode === "Dark" ? logo : logo) || logo}
                        alt="RMIFC logo"
                      />
                    </a>
                  </Link>
                </div>
                <h1 className="title">This WebSite is under construction</h1>
                <h5>Subscribe to our weekly newsletter</h5>
                <p>No spam, notifications only about news products, updates.</p>
                <div className="inner d-flex align-items-center flex-wrap">
                  <h5 className="follow-title mb--0 mr--20">Follow Us</h5>
                  <ul className="social-icon color-tertiary md-size justify-content-start">
                    <li>
                      <a href={SocialData.fb.url}>
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href={SocialData.twitter.url}>
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <form action="#" className="subscription-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="subscription-email"
                      placeholder="Enter your email"
                    />
                    <button className="axil-button button-rounded">
                      <span>Subscribe</span>
                    </button>
                  </div>
                </form> */}
              </div>
            </div>
            <div className="order-1 order-lg-2 col-lg-5 offset-lg-1">
              <div className="thumbnail">
                <Image
                  width={495}
                  height={480}
                  src={maintenance}
                  alt="Coming Soon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
