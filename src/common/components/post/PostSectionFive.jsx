import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { slugify } from "../../utils";
import { getStrapiMedia } from "../../../../lib/media";
import Moment from "react-moment";
const filters = [
  {
    id: 1,
    cate: "story",
  },
  {
    id: 2,
    cate: "nature",
  },
];

const defaultActiveCat = slugify(filters[0].cate);

const PostSectionFive = ({ postData }) => {
  const defaultData = postData.filter(
    (post) =>
      slugify(post.attributes.category.data.attributes.slug) ===
      defaultActiveCat
  );

  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  const [tabPostData, setTabPostData] = useState(defaultData);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];

    for (let i = 0; i < postData.length; i++) {
      const element = postData[i];

      // let categories = element["cate"];
      let categories = element.attributes.category.data.attributes.slug;

      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  const firstPost = tabPostData[0];

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-grey">
      <div className="container">
        <SectionTitleOne title="Pillars" />
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container id="axilTab" defaultActiveKey={activeNav}>
              <Nav className="axil-tab-button nav nav-tabs mt--20">
                {filters.map((data) => (
                  <Nav.Item key={data.id}>
                    <Nav.Link
                      onClick={handleChange}
                      eventKey={slugify(data.cate)}
                    >
                      {data.cate}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={activeNav}>
                  <div className="row">
                    <div className="col-xl-7 col-lg-7 col-md-12 col-12">
                      <div className="active show content-block post-grid post-grid-large mt--30">
                        {getStrapiMedia(firstPost.attributes.cover) ? (
                          <div className="post-thumbnail">
                            <Link href={`/post/${firstPost.attributes.slug}`}>
                              <a>
                                <Image
                                  src={getStrapiMedia(
                                    firstPost.attributes.cover,
                                    "small"
                                  )}
                                  alt={firstPost.title}
                                  height={660}
                                  width={705}
                                  priority={true}
                                />
                              </a>
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="post-grid-content">
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                <Link
                                  href={`/category/${slugify(
                                    firstPost.attributes.category.data
                                      .attributes.slug
                                  )}`}
                                >
                                  <a className="hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                      <span
                                        data-text={
                                          firstPost.attributes.category.data
                                            .attributes.slug
                                        }
                                      >
                                        {
                                          firstPost.attributes.category.data
                                            .attributes.slug
                                        }
                                      </span>
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <h3 className="title">
                              <Link href={`/post/${firstPost.attributes.slug}`}>
                                <a>{firstPost.attributes.title}</a>
                              </Link>
                            </h3>
                            <div className="post-meta-wrapper">
                              <div className="post-meta">
                                <div className="post-author-avatar border-rounded">
                                  <Image
                                    src={getStrapiMedia(
                                      firstPost.attributes.author.data
                                        .attributes.avatar,
                                      "thumbnail"
                                    )}
                                    alt={firstPost.author_name}
                                    height={50}
                                    width={50}
                                  />
                                </div>
                                <div className="content">
                                  <h6 className="post-author-name">
                                    <Link
                                      href={`/author/${slugify(
                                        firstPost.attributes.author.data
                                          .attributes.slug
                                      )}`}
                                    >
                                      <a className="hover-flip-item-wrapper">
                                        <span className="hover-flip-item">
                                          <span
                                            data-text={
                                              firstPost.attributes.author.data
                                                .attributes.name
                                            }
                                          >
                                            {
                                              firstPost.attributes.author.data
                                                .attributes.name
                                            }
                                          </span>
                                        </span>
                                      </a>
                                    </Link>
                                  </h6>
                                  <ul className="post-meta-list">
                                    <li>
                                      <Moment format="MMMM Do YYYY, h:mm:ss a">
                                        {firstPost.attributes.publishedAt}
                                      </Moment>
                                    </li>
                                    {/* <li>{firstPost.post_views}</li> */}
                                  </ul>
                                </div>
                              </div>
                              {/* <ul className="social-share-transparent justify-content-end">
                                {firstPost.author_social.map((data) => (
                                  <li key={data.url}>
                                    <a href={data.url}>
                                      <i className={data.icon} />
                                    </a>
                                  </li>
                                ))}
                              </ul> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12 col-12">
                      <div className="row">
                        {tabPostData.slice(1, 3).map((data) => (
                          <div
                            className="col-xl-12 col-lg-12 col-md-6 col-12"
                            key={data.slug}
                          >
                            <div className="content-block post-grid mt--30">
                              <div className="post-thumbnail">
                                <Link href={`/post/${data.attributes.slug}`}>
                                  <a>
                                    <Image
                                      src={getStrapiMedia(
                                        data.attributes.cover,
                                        "small"
                                      )}
                                      alt={data.attributes.title}
                                      height={294}
                                      width={495}
                                      priority={true}
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className="post-grid-content">
                                <div className="post-content">
                                  <div className="post-cat">
                                    <div className="post-cat-list">
                                      <Link
                                        href={`/category/${slugify(
                                          data.attributes.category.data
                                            .attributes.slug
                                        )}`}
                                      >
                                        <a className="hover-flip-item-wrapper">
                                          <span className="hover-flip-item">
                                            <span
                                              data-text={
                                                data.attributes.category.data
                                                  .attributes.name
                                              }
                                            >
                                              {
                                                data.attributes.category.data
                                                  .attributes.name
                                              }
                                            </span>
                                          </span>
                                        </a>
                                      </Link>
                                    </div>
                                  </div>
                                  <h4 className="title">
                                    <Link href={`/post/${data.slug}`}>
                                      <a>{data.title}</a>
                                    </Link>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionFive;
