// import InstagramOne from "../common/components/instagram/InstagramOne";
import FooterOne from "../common/elements/footer/FooterOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import { getAllPosts, getGlobalMeta } from "../../lib/api2";
// import PostSectionOne from "../common/components/post/PostSectionOne";
// import PostSectionTwo from "../common/components/post/PostSectionTwo";
// import PostSectionThree from "../common/components/post/PostSectionThree";
// import CategoryList from "../common/components/category/CategoryList";
// import PostSectionFour from "../common/components/post/PostSectionFour";
// import SocialOne from "../common/components/social/SocialOne";
// import PostSectionFive from "../common/components/post/PostSectionFive";
// import PostSectionSix from "../common/components/post/PostSectionSix";
import SliderOne from "../common/components/slider/SliderOne";

const HomeDefault = ({ allPosts, meta }) => {
  const videoPost = allPosts.filter(
    (post) => post.attributes.postFormat === "video"
  );

  return (
    <>
      <HeadTitle pageTitle={meta} />
      <HeaderOne postData={allPosts} meta={meta} />
      <SliderOne postData={allPosts} />
      {/* <PostSectionOne postData={allPosts} />
      <PostSectionTwo postData={allPosts} adBanner={true} />
      <CategoryList cateData={allPosts} />
      <PostSectionSix postData={allPosts} />
      <SocialOne />
      <PostSectionFive postData={allPosts} />
      <PostSectionFour postData={allPosts} adBanner={true} />
      <PostSectionThree postData={videoPost} heading="Featured Video" />
      <InstagramOne parentClass="bg-color-grey" />*/}
      <FooterOne />
    </>
  );
};

export default HomeDefault;

export async function getServerSideProps(context) {
  const allPosts = await getAllPosts();
  const GlobalMeta = await getGlobalMeta();
  return {
    props: { allPosts: allPosts.data, meta: GlobalMeta.data },
  };
}
