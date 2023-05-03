import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import FooterOne from "../common/elements/footer/FooterOne";
import { getAllPosts, getGlobalMeta } from "../../lib/api2";

const HomeDefault = ({ allPosts, meta }) => {
  const SliderOne = dynamic(
    () => import("../common/components/slider/SliderOne"),
    {
      suspense: true,
    }
  );
  const PostSectionFive = dynamic(
    () => import("../common/components/post/PostSectionFive"),
    {
      suspense: true,
    }
  );
  const PostSectionFour = dynamic(
    () => import("../common/components/post/PostSectionFour"),
    {
      suspense: true,
    }
  );
  const videoPost = allPosts.filter(
    (post) => post.attributes.postFormat === "video"
  );

  return (
    <>
      <HeadTitle pageTitle={meta} />

      <HeaderOne postData={allPosts} meta={meta} />

      <Suspense fallback={<div>Loading...</div>}>
        <SliderOne postData={allPosts} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PostSectionFive postData={allPosts} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PostSectionFour postData={allPosts} adBanner={false} />
      </Suspense>

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
