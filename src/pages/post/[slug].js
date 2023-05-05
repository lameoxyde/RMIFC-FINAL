import {
  getPostBySlug,
  getAllPosts,
  fetchAPI,
  getGlobalMeta,
} from "../../../lib/api2";
import HeadTitle from "../../common/elements/head/HeadTitle";
import HeaderOne from "../../common/elements/header/HeaderOne";
import FooterOne from "../../common/elements/footer/FooterOne";
import PostFormatStandard from "../../common/components/post/format/PostFormatStandard";
import InstagramOne from "../../common/components/instagram/InstagramOne";
// import Layout from "../../common/components/layout";
const PostDetails = ({ post, allPosts, meta }) => {
  return (
    <>
      <HeaderOne
        postData={allPosts}
        meta={meta}
        pClass="header-light header-sticky header-with-shadow"
      />
      <HeadTitle pageTitle={meta} />
      <PostFormatStandard postData={post} allData={allPosts} />
      <InstagramOne parentClass="bg-color-extra03" />
      <FooterOne />
    </>
  );
};

export default PostDetails;

// export async function getStaticPaths() {
//   const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

//   return {
//     paths: articlesRes.data.map((article) => ({
//       params: {
//         slug: article.attributes.slug,
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
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: slug,
    },
    populate: ["image", "category", "author.avatar", "cover", "blocks"],
  });
  const allPosts = await getAllPosts();
  const GlobalMeta = await getGlobalMeta();

  if (!articlesRes.data[0]) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  const content = (await articlesRes.data[0].attributes.blocks[0].body) || "";

  // const content = await markdownToHtml(
  //   articlesRes.data[0].attributes.blocks[0].body || ""
  // );

  return {
    props: {
      post: {
        ...articlesRes.data[0],
        content,
      },
      allPosts: allPosts.data,
      meta: GlobalMeta.data,
    },
  };
}
