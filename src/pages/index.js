import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import { getAllPosts, getGlobalMeta } from "../../lib/api2";
import SliderOne from "../common/components/slider/SliderOne";
import PostSectionFive from "../common/components/post/PostSectionFive";
import PostSectionFour from "../common/components/post/PostSectionFour";

import FooterOne from "../common/elements/footer/FooterOne";
const HomeDefault = ({ allPosts, meta }) => {
  const videoPost = allPosts.filter(
    (post) => post.attributes.postFormat === "video"
  );

  return (
    <>
      <HeadTitle pageTitle={meta} />

      <HeaderOne postData={allPosts} meta={meta} />

      <SliderOne postData={allPosts} />

      <PostSectionFive postData={allPosts} />

      <PostSectionFour postData={allPosts} adBanner={false} />

      <FooterOne />
    </>
  );
};

export default HomeDefault;

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const allPosts = await getAllPosts();
  const GlobalMeta = await getGlobalMeta();
  return {
    props: { allPosts: allPosts.data, meta: GlobalMeta.data },
  };
}
