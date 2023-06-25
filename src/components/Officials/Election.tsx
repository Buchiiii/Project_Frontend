import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../controller/api";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
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

type Electionn = {
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
export const Election = () => {
  const navigate = useNavigate();
  const [election, setElection] = useState<null | Electionn[]>(null);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const limitForsmallScreens = 2;

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

  const getElectionForSmallScreens = async () => {
    try {
      const response = await API.get(`elections?page=1&limit=${limitForsmallScreens}`);
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

  const getPageForSmallScreens = async (currentPage: number) => {
    try {
      const response = await API.get(
        `elections?page=${currentPage}&limit=${limitForsmallScreens}`
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
      if(window.innerWidth <= 991){
        const page = await getPageForSmallScreens(data.selected + 1);
      setElection(page);
      }
      const page = await getPage(data.selected + 1);
      setElection(page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 991){
      getElectionForSmallScreens()
    }
    else{
      getElection();
    }

    // const updateMedia= () =>{
    //   if (window.innerWidth <= 991){
    //     getElectionForSmallScreens()
    //   }
    //   else{
    //     getElection();
    //   }
    // }
    
    //window.addEventListener('resize', updateMedia);
    // return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <>
      <Container fluid="lg" className="h-100">
        <Row className="">
          <Col>
            <div className="ps-5 pt-4">
              <span style={{ fontSize: "40px" }}>Election</span>
            </div>
            {/* <div className="pt-2">
              <InputGroup>
                <InputGroup.Text className="bg-light ">
                  <span>
                    <i className="bi bi-search"></i>
                  </span>
                </InputGroup.Text>
                <input
                  className="form-control ps-3"
                  placeholder="Search by name "
                  // disabled={patient ? false : true}
                  onChange={(e) => {
                    //const value=e.target.value;
                  }}
                />
              </InputGroup>
            </div> */}
            <div className="text-end mt-1 me-5">
              <button
                onClick={() => {
                  navigate("/official/election/create");
                }}
                className="btn btn-primary"
              >
                <span>
                  <i className="bi bi-plus me-2"></i>Create New Elecction
                </span>
              </button>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            height: "73%",
          }}
          className=" pb-4 gx-5 gy-3 mt-3 ms-5 me-5 bg-light border rounded"
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
                      <Row className="h-100    justify-content-center">
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
                                        onClick={() => {
                                          navigate(
                                            `/official/election/${element.id}`
                                          );
                                        }}
                                        // href={`/official/election/${element.id}`}
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
                      </Row>
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
