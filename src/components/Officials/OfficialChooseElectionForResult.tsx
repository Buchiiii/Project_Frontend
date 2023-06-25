import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../controller/api";
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
  // {
  // 		id: string,
  // 		lastName: string,
  // 		firstName: string,
  // 		otherName: string,
  // 		email: string,
  // 		dateOfBirth: string,
  // 		course: string,
  // 		matricNo: string,
  // 		level: string,
  // 		registrationDate: string;
  // 	}
};

export const OfficialChooseElectionForResult = () => {
  const navigate = useNavigate();
  const [election, setElection] = useState<null | Election[]>(null);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const limitForsmallScreen = 4;

  const getElection = async () => {
    try {
      const response = await API.get(`elections?page=1&limit=${limit}`);
      setElection(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      console.log(err);
    }

    //setElection(response);
  };

  const getElectionForSmallScreen = async () => {
    try {
      const response = await API.get(`elections?page=1&limit=${limit}`);
      setElection(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      console.log(err);
    }

    //setElection(response);
  };


  const getPage = async (currentPage: number) => {
    try {
      const response = await API.get(
        `elections?page=${currentPage}&limit=${limit}`
      );
      console.log(response.data.data);
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
    <>
      <Container fluid="lg" className="h-100">
        <Row className="">
          <Col>
            <div className=" pt-4 ps-5">
              <span style={{ fontSize: "40px" }}>Choose an election</span>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            height: "75%",
          }}
          className=" pb-4 gx-5 gy-3 mt-5 ms-5 me-5 bg-light border rounded"
        >
          {election && election.length > 0 ? (
            <>
              {election ? (
                <>
                  {election.map((element) => (
                    <Col lg={6} className=" forcolumn h-50" key={element.id}>
                      {/* <Link
                        className="text-decoration-none text-dark "
                        to={`/voters/election/${element.id}`}
                      > */}

                      <Link
                        className="text-decoration-none text-dark "
                        to={`/official/result/${element.id}`}
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
                      {/* <Row className="h-100    justify-content-center">
                        <div className="daybookBranchBox  border  ">
                          <Container className="h-100 ">
                            <Row>
                              <Col>
                                <div className=" text-end">
                                  <Dropdown>
                                    <DropdownToggle variant="light bg-white border-0">
                                      <span>
                                        <i className="bi bi-three-dots bg-white "></i>
                                      </span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem
                                        href={`/official/election/${element.id}`}
                                      >
                                        Properties
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>
                              </Col>
                            </Row>
                            <Row className="  pt-5 h-100 text-center ">
                              <Col>{element.name}</Col>
                            </Row>
                          </Container>
                        </div>
                      </Row> */}
                      {/* </Link> */}
                    </Col>
                  ))}
                </>
              ) : (
                <>
                  <div>
                    <p>Still loading</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="text-center pt-5 pb-5 mt-5 mb-5">
                <p>No election available</p>
              </div>
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
    </>
  );
};
