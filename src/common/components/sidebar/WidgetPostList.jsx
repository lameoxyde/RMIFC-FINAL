import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../../../../lib/media";
import Moment from "react-moment";
const WidgetPostList = ({ postData }) => {
  return (
    <div className="axil-single-widget widget widget_postlist mb--30">
      <h5 className="widget-title">Popular on Blogar</h5>
      <div className="post-medium-block">
        {postData.slice(0, 3).map((data) => (
          <div
            className="content-block post-medium mb--20"
            key={data.attributes.slug}
          >
            {getStrapiMedia(data.attributes.cover) ? (
              <div className="post-thumbnail">
                <Link href={`/post/${data.attributes.slug}`}>
                  <a>
                    <Image
                      src={getStrapiMedia(data.attributes.cover, "thumbnail")}
                      alt={data.attributes.title}
                      height={100}
                      width={100}
                      priority={true}
                    />
                  </a>
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="post-content">
              <h6 className="title">
                <Link href={`/post/${data.attributes.slug}`}>
                  <a>{data.attributes.title}</a>
                </Link>
              </h6>
              <div className="post-meta">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPostList;
