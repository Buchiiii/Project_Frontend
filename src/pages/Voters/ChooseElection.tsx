import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { API } from "../../services/controller/api";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

type Candidate = {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  dateOfBirth: string;
  course: string;
  matricNo: string;
  level: string;
  registrationDate: string;
};

type Election = {
  id: string;
  name: string;
  course: string;
  level: string;
  candidates: Candidate[];
};

export const ChooseElection = () => {
  const voterId = JSON.parse(window.localStorage.getItem("ID") as string);
  const navigate = useNavigate();
  const [election, setElection] = useState<null | Election[]>(null);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;

  const getElection = async () => {
    try {
      const response = await API.get(
        `elections/voter/${voterId}?page=1&limit=${limit}`
      );
      setElection(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      console.log(err);
    }
  };

  const getPage = async (currentPage: number) => {
    try {
      const response = await API.get(
        `elections/voter/${voterId}?page=${currentPage}&limit=${limit}`
      );
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = async (data: { selected: number }) => {
    console.log(data.selected + 1);
    try {
      const page = await getPage(data.selected + 1);
      setElection(page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getElection();
  }, []);

  return (
    <Container fluid="lg" className="h-100 ">
      <Row className="">
        <Col>
          <div className="pt-4 ps-5">
            <h1>Choose an election</h1>
          </div>
        </Col>
      </Row>

      <Row className="h-75 gx-5 pb-4 gy-3 mt-5 ms-5 me-5 bg-light border rounded">
        {election ? (
          <>
            {" "}
            {election.length > 0 ? (
              <>
                {election.map((element) => (
                  <Col lg={6} className=" forcolumn h-50" key={element.id}>
                    <Link
                      className="text-decoration-none text-dark "
                      to={`/voters/election/${element.id}`}
                    >
                      <Row className="h-100    justify-content-center">
                        <div className="daybookBranchBox  border  ">
                          <Container className="h-100 ">
                            <Row className="h-100 text-center align-content-center">
                              <Col>{element.name}</Col>
                            </Row>
                          </Container>
                        </div>
                      </Row>
                    </Link>
                  </Col>
                ))}
              </>
            ) : (
              <>
                <div className="text-center pt-5 pb-5 mt-5 mb-5">
                  <p>No election available</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {" "}
            <Container className="h-100 pt-4 ps-5 pe-5">
              <Row className="border rounded bg-light h-75 align-items-center">
                <Col className="text-center  ">
                  <Spinner animation="border" />
                </Col>
              </Row>
            </Container>
          </>
        )}

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
      </Row>
    </Container>
  );
};
