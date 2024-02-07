import { useState } from "react";
import { Col, Container, InputGroup, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import SelectRole from "../../components/Select-role";
import { GetElectionRoles } from "../hooks/get-election-roles-hook";
import GetElectionCandidates from "../hooks/get-election-candidates";

export const AdminCandidateList = () => {
  const { id } = useParams();
  const roles = GetElectionRoles(id as string);
  const [searchParam, setSearchParam] = useState("");
  const candidates = GetElectionCandidates(id as string, searchParam);

  const navigate = useNavigate();

  return (
    <>
      <Container fluid="lg" className="pt-2 h-100">
        <Row className=" ">
          <Col>
            <div>
              <button
                onClick={() => {
                  navigate("/official/candidate");
                }}
                className="btn btn-light"
              >
                <span>
                  <i className="bi bi-arrow-left"></i>
                </span>
              </button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <span style={{ fontSize: "40px" }}>Candidates</span>
          </Col>
        </Row>
        <Row className="mt-2  justify-content-end">
          <Col className="">
            <div className="text-end  ">
              <div style={{ width: "20%" }}>
                <SelectRole setSearchParam={setSearchParam} roles={roles} />
              </div>
            </div>
          </Col>
        </Row>
        {searchParam !== "Select a role" ? (
          <>
            <Row className="">
              <Col>
                <>
                  <div className="pt-4">
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
                  </div>
                  <Table hover className="mt-3">
                    <thead className="border bg-light">
                      <tr>
                        <td>#</td>
                        <td>Name</td>
                        <td>Matric Number</td>
                        <td>Course</td>
                        <td>Level</td>
                      </tr>
                    </thead>
                    {candidates?.map((element, index) => (
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {element.lastName} {element.firstName}
                          </td>
                          <td>{element.matricNo}</td>
                          <td>{element.course}</td>
                          <td>{element.level}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className=" align-items-center h-75">
              <Col>
                <div className="text-center">
                  <span style={{ fontSize: "25px" }}>Please select a role</span>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
