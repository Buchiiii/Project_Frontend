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
import { API } from "../../services/controller/api";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import ReactPaginate from "react-paginate";
import { GetPaginatedElectionHook } from "../hooks/get-paginated-election-hook";

interface Candidate {
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
}

interface Electionn {
  id: string;
  name: string;
  course: string;
  level: string;
  candidates: Candidate[];
}
export const Election = () => {
  const limit = 4;
  const navigate = useNavigate();
  const { election, setElection, totalPages } = GetPaginatedElectionHook(
    1,
    limit
  );

  const handlePageChange = async (data: { selected: number }) => {
    console.log(data.selected + 1);
    try {
      const { election: page } = GetPaginatedElectionHook(
        data.selected + 1,
        limit
      );
      setElection(page);
    } catch (err) {
      console.log(err);
    }
  };

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
