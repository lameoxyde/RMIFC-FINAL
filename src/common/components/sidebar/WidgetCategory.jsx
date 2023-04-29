import Link from "next/link";
import Image from "next/image";
import { removeDuplicates, slugify } from "../../utils";
import { getStrapiMedia } from "../../../../lib/media";
const WidgetCategory = ({ catData }) => {
  // console.log(catData[0].attributes.category);
  // const uniqueCategory = removeDuplicates(
  //   catData.attributes.category,
  //   "category"
  // );

  return (
    <div className="axil-single-widget widget widget_categories mb--30">
      <ul>
        {catData.slice(0, 4).map((data) => (
          <li className="cat-item" key={data.slug}>
            <Link
              href={`/category/${slugify(
                data.attributes.category.data.attributes.name
              )}`}
            >
              <a className="inner">
                <div className="thumbnail">
                  <Image
                    src={getStrapiMedia(
                      data.attributes.category.data.attributes.cover
                    )}
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
