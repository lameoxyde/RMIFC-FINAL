import Link from "next/link";
import Image from "next/image";
import Layout from "../layout/";
import Slider from "react-slick";
import Moment from "react-moment";
import { slugify } from "../../utils";
import { getStrapiMedia } from "../../../../lib/media";

const SliderOne = ({ postData }) => {
  const slidePost = postData.filter(
    (post) => post.attributes.slidePost === true
  );

  function SlickNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow next-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow prev-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-left"></i>
      </button>
    );
  }

  const slideSettings = {
    dots: false,
    infinite: false,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
  };
  return (
    <div className="slider-area bg-color-grey">
      <div className="axil-slide slider-style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Slider
                {...slideSettings}
                className="slider-activation axil-slick-arrow"
              >
                {slidePost.slice(0, 3).map((data) => (
                  <div className="content-block" key={data.attributes.slug}>
                    {/* Start Post Thumbnail  */}
                    {getStrapiMedia(data.attributes.cover) ? (
                      <div className="post-thumbnail">
                        <Link href={`/post/${data.attributes.slug}`}>
                          <a>
                            <Layout>
                              <Image
                                src={getStrapiMedia(
                                  data.attributes.cover,
                                  "medium"
                                )}
                                alt={data.attributes.cover.data.attributes.name}
                                height={615}
                                width={1230}
                                priority
                                placeholder="blur"
                                blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXw8AAgMBQLfkYc4AAAAASUVORK5CYII=`}
                              />
                            </Layout>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* End Post Thumbnail  */}
                    {/* Start Post Content  */}
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          <Link
                            href={`/category/${slugify(
                              data.attributes.category.data.attributes.name
                            )}`}
                          >
                            <a className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span
                                  data-text={
                                    data.attributes.category.data.attributes
                                      .name
                                  }
                                >
                                  {
                                    data.attributes.category.data.attributes
                                      .name
                                  }
                                </span>
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                      <h2 className="title">
                        <Link href={`/post/${data.attributes.slug}`}>
                          <a>{data.attributes.title}</a>
                        </Link>
                      </h2>
                      {/* Post Meta  */}
                      <div className="post-meta-wrapper with-button">
                        <div className="post-meta">
                          <div className="post-author-avatar border-rounded">
                            <Image
                              src={getStrapiMedia(
                                data.attributes.author.data.attributes.avatar,
                                "thumbnail"
                              )}
                              alt={data.attributes.author.data.attributes.name}
                              height={50}
                              width={50}
                              placeholder="blur"
                              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXw8AAgMBQLfkYc4AAAAASUVORK5CYII=`}
                            />
                          </div>
                          <div className="content">
                            <h6 className="post-author-name">
                              <Link
                                href={`/author/${slugify(
                                  data.attributes.author.data.attributes.name
                                )}`}
                              >
                                <a className="hover-flip-item-wrapper">
                                  <span className="hover-flip-item">
                                    <span
                                      data-text={
                                        data.attributes.author.data.attributes
                                          .name
                                      }
                                    >
                                      {
                                        data.attributes.author.data.attributes
                                          .name
                                      }
                                    </span>
                                  </span>
                                </a>
                              </Link>
                            </h6>
                            <ul className="post-meta-list">
                              <li>
                                <Moment format="MMMM Do YYYY, h:mm:ss a">
                                  {data.attributes.publishedAt}
                                </Moment>
                              </li>
                              {/* <li>{data.post_views}</li> */}
                            </ul>
                          </div>
                        </div>
                        {/* <ul className="social-share-transparent justify-content-end">
                          {data.author_social.map((data) => (
                            <li key={data.url}>
                              <a href={data.url}>
                                <i className={data.icon} />
                              </a>
                            </li>
                          ))}
                        </ul> */}
                        <div className="read-more-button cerchio">
                          <Link href={`/post/${data.attributes.slug}`}>
                            <a className="axil-button button-rounded hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span data-text="Read Post">Read Post</span>
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* End Post Content  */}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderOne;
