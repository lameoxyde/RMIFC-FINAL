import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../utils";
import { getStrapiMedia } from "../../../../../../lib/media";
const PostMetaTwo = ({ metaData }) => {
  return (
    <div className="banner banner-single-post post-formate post-video axil-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Start Single Slide  */}
            <div className="content-block">
              {/* Start Post Content  */}
              <div className="post-content">
                <div className="post-cat">
                  <div className="post-cat-list">
                    <Link
                      href={`/category/${slugify(
                        metaData.attributes.category.data.attributes.name
                      )}`}
                    >
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          <span
                            data-text={
                              metaData.attributes.category.data.attributes.name
                            }
                          >
                            {metaData.attributes.category.data.attributes.name}
                          </span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <h1 className="title">{metaData.attributes.title}</h1>
                {/* Post Meta  */}
                <div className="post-meta-wrapper">
                  <div className="post-meta">
                    <div className="post-author-avatar border-rounded">
                      <Image
                        src={getStrapiMedia(
                          metaData.attributes.author.data.attributes.avatar
                        )}
                        alt={metaData.attributes.author.data.attributes.name}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="content">
                      <h6 className="post-author-name">
                        <Link
                          href={`/author/${slugify(
                            metaData.attributes.author.data.attributes.name
                          )}`}
                        >
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span
                                data-text={
                                  metaData.attributes.author.data.attributes
                                    .name
                                }
                              >
                                {
                                  metaData.attributes.author.data.attributes
                                    .name
                                }
                              </span>
                            </span>
                          </a>
                        </Link>
                      </h6>
                      <ul className="post-meta-list">
                        <li>{metaData.attributes.publishedAt}</li>
                        {/* <li>{metaData.post_views}</li> */}
                      </ul>
                    </div>
                  </div>
                  {/* <ul className="social-share-transparent justify-content-end">
                    {metaData.author_social.map((social) => (
                      <li key={social.url}>
                        <a href={social.url}>
                          <i className={social.icon} />
                        </a>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
              {/* End Post Content  */}
            </div>
            {/* End Single Slide  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMetaTwo;
