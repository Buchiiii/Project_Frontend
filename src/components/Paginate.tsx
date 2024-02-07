import ReactPaginate from "react-paginate";

interface IPaginateProps {
  totalPages: number;
  handlePageChange: (data: { selected: number }) => Promise<void>;
}
const Paginate = ({ totalPages, handlePageChange }: IPaginateProps) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={"pagination justify-content-end pb-2 mt-5"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </>
  );
};

export default Paginate;
