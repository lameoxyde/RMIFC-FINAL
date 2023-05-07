import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import markdownToHtml from "../../../lib/markdownToHtml";
import {
  getAllCategories,
  fetchAPI,
  getGlobalMeta,
  getAllPosts,
} from "../../../lib/api2";
import { getStrapiMedia } from "../../../lib/media";
import InstagramOne from "../../common/components/instagram/InstagramOne";
import FooterOne from "../../common/elements/footer/FooterOne";
import HeaderOne from "../../common/elements/header/HeaderOne";
import PostLayoutTwo from "../../common/components/post/layout/PostLayoutTwo";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from "../../common/utils";
import HeadTitle from "../../common/elements/head/HeadTitle";

const AuthorArchive = ({ authorData, allPosts, meta }) => {
  const [blogs] = useState(allPosts);
  const [pageNumber, setPageNumber] = useState(0);

  const blogsPerPage = 5;
  const pageVisited = pageNumber * blogsPerPage;

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <HeadTitle pageTitle={meta} />
      <HeaderOne postData={allPosts} meta={meta} />
      <div className="axil-author-area axil-author-banner bg-color-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-author">
                <div className="media">
                  <div className="thumbnail">
                    <Link href="#">
                      <a>
                        <Image
                          src={getStrapiMedia(authorData.attributes.avatar)}
                          alt={authorData.attributes.name}
                          height={105}
                          width={105}
                          priority={true}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="author-info">
                      <h1 className="title">{authorData.attributes.name}</h1>
                      <span className="b3 subtitle">
                        {authorData.attributes.email}
                      </span>
                    </div>
                    <div className="content">
                      <p className="b1 description">
                        {authorData.attributes.description}
                      </p>
                      {/* <ul className="social-share-transparent size-md">
                        {authorData[0].author_social.map((social) => (
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
            </div>
          </div>
        </div>
      </div>

      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title">
                <h2 className="title mb--40">Articles By This Author</h2>
              </div>
            </div>
            <div className="col-lg-8 col-xl-8">
              <PostLayoutTwo
                dataPost={authorData.attributes.articles.data}
                show={pageVisited + blogsPerPage}
                postStart={pageVisited}
              />

              <ReactPaginate
                previousLabel={<i className="fas fa-arrow-left"></i>}
                nextLabel={<i className="fas fa-arrow-right"></i>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"prev"}
                nextLinkClassName={"next"}
                disabledClassName={"disabled"}
                activeClassName={"current"}
              />
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne dataPost={allPosts} />
            </div>
          </div>
        </div>
      </div>
      {/*<InstagramOne parentClass="bg-color-grey" />*/}
      <FooterOne />
    </>
  );
};

export default AuthorArchive;

// export async function getStaticPaths() {
//   const authorsRes = await fetchAPI("/authors", { fields: ["slug"] });

//   return {
//     paths: authorsRes.data.map((author) => ({
//       params: {
//         slug: author.attributes.slug,
//       },
//     })),
//     fallback: false,
//   };
// }
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );
  const { slug } = context.query;
  const matchingAuthors = await fetchAPI("/authors", {
    filters: {
      slug: slug,
    },
    populate: ["author.avatar"],
    populate: [
      "articles.category",
      "articles.cover",
      "articles.blocks",
      "articles.author",
      "avatar",
      "articles.category.cover",
    ],
  });
  if (!matchingAuthors.data[0]) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  const GlobalMeta = await getGlobalMeta();

  const content = (await matchingAuthors.data[0].attributes.description) || "";

  // const content = await markdownToHtml(
  //   matchingAuthors.data[0].attributes.description || ""
  // );

  return {
    props: {
      authorData: {
        ...matchingAuthors.data[0],
        content,
      },
      allPosts: matchingAuthors.data[0].attributes.articles.data,
      meta: GlobalMeta.data,
    },
  };
}
