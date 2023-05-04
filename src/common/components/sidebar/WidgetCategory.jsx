import Link from "next/link";
import Image from "next/image";
import { removeDuplicates, slugify } from "../../utils";
import { getStrapiMedia } from "../../../../lib/media";
import { getAllCategories } from "../../../../lib/api2";
const WidgetCategory = ({ catData, cat }) => {
  // console.log(catData[0].attributes.category);
  // const uniqueCategory = removeDuplicates(
  //   catData.attributes.category,
  //   "category"
  // );
  // console.log(cat);
  return (
    <div className="axil-single-widget widget widget_categories mb--30">
      <ul>
        {catData.slice(0, 4).map((data) => (
          <li
            className="cat-item"
            key={data.attributes.category.data.attributes.slug}
          >
            <Link
              href={`/category/${slugify(
                data.attributes.category.data.attributes.name
              )}`}
            >
              <a className="inner">
                <div className="thumbnail">
                  <Image
                    src={getStrapiMedia(data.attributes.cover)}
                    alt={data.attributes.category.data.attributes.name}
                    height={50}
                    width={50}
                    priority={true}
                  />
                </div>
                <div className="content">
                  <h5 className="title">
                    {data.attributes.category.data.attributes.name}
                  </h5>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetCategory;

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );
  const cat = await getAllCategories();

  return {
    props: { cat: cat.data },
  };
}
