import PostMetaOne from "./element/PostMetaOne";
import PostAuthor from "./element/PostAuthor";
import SidebarTwo from "../../sidebar/SidebarTwo";
import PostMetaTwo from "./element/PostMetaTwo";
// import PostComment from "./element/PostComment";
// import PostTagShare from "./element/PostTagShare";
import ReactMarkdown from "react-markdown";

import { getStrapiMedia } from "../../../../../lib/media";
import ImgURI_Strapi from "../../../../../lib/ImgUriMarkdown";
const PostFormatStandard = ({ postData, allData }) => {
  const basePathLink =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
      : "";

  // const postContent = postData.content.replaceAll(
  //   "/images/",
  //   basePathLink + "/images/"
  // );

  return (
    <>
      {getStrapiMedia(postData.attributes.cover) ? (
        <PostMetaOne metaData={postData} />
      ) : (
        ""
      )}

      <div className="post-single-wrapper axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {getStrapiMedia(postData.attributes.cover) ? (
                ""
              ) : (
                <PostMetaTwo metaData={postData} />
              )}

              <div className="axil-post-details">
                <div className="post-details-content">
                  <ReactMarkdown
                    children={postData.content}
                    escapeHtml={false}
                    transformImageUri={ImgURI_Strapi}
                  />
                </div>
                {/* <PostTagShare postTags={postData} /> */}
                <PostAuthor dataAuthor={postData} />
                {/* <PostComment />  */}
              </div>
            </div>
            <div className="col-lg-4">
              <SidebarTwo dataPost={allData} tagData={postData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatStandard;
