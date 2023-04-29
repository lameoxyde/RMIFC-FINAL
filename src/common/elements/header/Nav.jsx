import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";

const filters = [
  {
    id: 1,
    cate: "food",
  },
  {
    id: 2,
    cate: "nature",
  },
  {
    id: 3,
    cate: "news",
  },
  {
    id: 4,
    cate: "story",
  },
];

const defaultActiveCat = slugify(filters[0].cate);

const Nav = ({ posts }) => {
  const defaultData = posts.filter(
    (post) =>
      slugify(post.attributes.category.data.attributes.name) ===
      defaultActiveCat
  );

  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  const [tabPostData, setTabPostData] = useState(defaultData);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];

    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      let categories = element.attributes.category.data.attributes.name;
      //   let categories = element["cate"];

      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  return (
    <ul className="mainmenu">
      <li className="menu-item-has-children">
        <a href="/">Home</a>
      </li>
    </ul>
  );
};

export default Nav;
