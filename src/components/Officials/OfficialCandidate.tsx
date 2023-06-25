import { useEffect, useState } from "react";
import { Col, Container, InputGroup, Row, Tab, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../controller/api";

type electionRole = {
  id: string;
  role: string;
};

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
export const OfficialCandidate = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<null | electionRole[]>(null);
  const [candidates, setCandidates] = useState<null | Candidate[]>(null);
  const [searchParam, setSearchParam] = useState("Select a role");
  const navigate = useNavigate();

  const getRoles = async () => {
    try {
      const response = await API.get(`elections/roles/${id}`);
      setRoles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCandidates = async () => {
    try {
      const response = await API.get(
        `elections/candidates/${id}?role=${searchParam}`
      );
      setCandidates(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (searchParam !== "Select a role") {
      getCandidates();
    }

    console.log(searchParam);
    console.log(candidates);
  }, [searchParam]);

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
                <select
                  onChange={(e) => {
                    // if (e.target.value !== "Select a role") {
                    setSearchParam(e.target.value);
                    // }
                  }}
                  className="form-select"
                  placeholder="Select a role"
                >
                  <option selected>Select a role</option>
                  {roles &&
                    roles?.map((element) => (
                      <option key={element.id} value={element.role}>
                        {element.role}
                      </option>
                    ))}
                </select>
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
                    {candidates?.map((element,index)=>(
                      <tbody >
                        <tr>
                          <td>{index + 1}</td>
                          <td>{element.lastName} {element.firstName}</td>
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
