import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../../../../../../lib/media";

const PostAuthor = ({ dataAuthor }) => {
  console.log(dataAuthor.attributes.author.data.attributes);
  return (
    <div className="about-author">
      <div className="media">
        <div className="thumbnail">
          <Link href="#">
            <a>
              <Image
                src={getStrapiMedia(
                  dataAuthor.attributes.author.data.attributes.avatar
                )}
                alt={dataAuthor.attributes.author.data.attributes.name}
                height={105}
                width={105}
              />
            </a>
          </Link>
        </div>
        <div className="media-body">
          <div className="author-info">
            <h5 className="title">
              <Link href="#">
                <a className="hover-flip-item-wrapper">
                  <span className="hover-flip-item">
                    <span
                      data-text={
                        dataAuthor.attributes.author.data.attributes.name
                      }
                    >
                      {dataAuthor.attributes.author.data.attributes.name}
                    </span>
                  </span>
                </a>
              </Link>
            </h5>
            <span className="b3 subtitle">
              {dataAuthor.attributes.author.data.attributes.email}
            </span>
          </div>
          <div className="content">
            <p className="b1 description">
              {dataAuthor.attributes.author.data.attributes.description}
            </p>
            {/* <ul className="social-share-transparent size-md">
            { dataAuthor.author_social.map((social) => (
                <li key={social.url}>
                    <a href={social.url}>
                    <i className={social.icon} />
                    </a>
                </li>
            ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;
