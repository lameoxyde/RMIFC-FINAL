import { getAllCategories, fetchAPI, getGlobalMeta } from "../../../lib/api2";
import markdownToHtml from "../../../lib/markdownToHtml";
import InstagramOne from "../../common/components/instagram/InstagramOne";
import PostLayoutTwo from "../../common/components/post/layout/PostLayoutTwo";
import BreadcrumbOne from "../../common/elements/breadcrumb/breadcrumbOne";
import FooterOne from "../../common/elements/footer/FooterOne";
import HeadTitle from "../../common/elements/head/HeadTitle";
import HeaderOne from "../../common/elements/header/HeaderOne";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from "../../common/utils";

const PostCategory = ({ postData, allPosts, meta }) => {
  return (
    <>
      <HeadTitle pageTitle={meta} />
      <HeaderOne postData={allPosts} meta={meta} />
      <BreadcrumbOne title={postData.attributes.name} />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <PostLayoutTwo dataPost={postData} show="5" />
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              {/* <SidebarOne dataPost={allPosts} /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <InstagramOne parentClass="bg-color-grey" />
      <FooterOne /> */}
    </>
  );
};

export default PostCategory;

// export async function getStaticPaths() {
//   const cateogryRes = await fetchAPI("/categories", { fields: ["slug"] });

//   return {
//     paths: cateogryRes.data.map((category) => ({
//       params: {
//         slug: category.attributes.slug,
//       },
//     })),
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: {
      slug: params.slug,
    },
    populate: ["articles"],
    populate: [
      "articles.category",
      "articles.cover",
      "articles.blocks",
      "articles.author",
      "",
    ],
  });

  if (!matchingCategories.data[0]) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  const GlobalMeta = await getGlobalMeta();

  const content = await markdownToHtml(
    matchingCategories.data[0].attributes.description || ""
  );

  return {
    props: {
      postData: {
        ...matchingCategories.data[0],
        content,
      },
      allPosts: matchingCategories.data[0].attributes.articles.data,
      meta: GlobalMeta.data,
    },
  };
}
