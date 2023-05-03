// import AddBanner from "../ad-banner/AddBanner";
import SidebarOne from "../sidebar/SidebarOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getAllCategories } from "../../../../lib/api2";
const PostSectionFour = ({ postData, adBanner }) => {
  const [blogs] = useState(postData);
  const [pageNumber, setPageNumber] = useState(0);

  const blogsPerPage = 5;
  const pageVisited = pageNumber * blogsPerPage;

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xl-8">
            {/* {adBanner === true ? <AddBanner img="/images/add-banner/banner-01.webp" height="210" width="810" /> : ""
            } */}
            {/* <PostLayoutTwo dataPost={postData} show="5" /> */}
            <PostLayoutTwo
              dataPost={postData}
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
            <SidebarOne dataPost={postData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionFour;
