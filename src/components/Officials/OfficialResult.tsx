import { useState, useEffect } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../controller/api";

type electionRole = {
  id: string;
  role: string;
};

type count = {
  id: string;
  electionId: string;
  count: number;
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
  counts: count[];
};

export const OfficialResult = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<null | electionRole[]>(null);
  const [candidates, setCandidates] = useState<null | Candidate[]>(null);
  const [searchParam, setSearchParam] = useState("");

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
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const countVotes = (countArray: count[]) => {
    let newArray: count[] = [];
    if (countArray.length > 0) {
      newArray = countArray.filter((element) => {
        return element.electionId === id;
      });
    }

    return newArray[0].count;
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getCandidates();
  }, [searchParam]);
  return (
    <>
      <Container fluid="lg" className="pt-2 h-100">
        <Row className=" ">
          <Col>
            <div>
              <button
                onClick={() => {
                  navigate("/official/result");
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
            <h1>Result</h1>
          </Col>
        </Row>
        <Row className="mt-2  justify-content-end">
          <Col className="">
            <div className="text-end  ">
              <div style={{ width: "20%" }}>
                <select
                  onChange={(e) => {
                    if (e.target.value !== "Select a role") {
                      setSearchParam(e.target.value);
                    }
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

        <Row className="mt-4">
          <Col>
            {candidates?.map((element, index) => (
              <div key={element.id} className="mb-3">
                <Accordion className="mt-2">
                  <Accordion.Item eventKey={`${index + 1}`}>
                    <Accordion.Header>
                      Candidate {index + 1} : <span>&nbsp;</span>{" "}
                      <span>&nbsp;</span> {element.lastName} {element.firstName}
                    </Accordion.Header>
                    <AccordionBody>
                      <Row className="mt-3">
                        <Col className="">
                          Last Name:<span>&nbsp;</span> {element.lastName}
                        </Col>

                        <Col className="">
                          First Name:<span>&nbsp;</span> {element.firstName}
                        </Col>

                        <Col className="">
                          Other Names: <span>&nbsp;</span>
                          {element.otherName}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          Course: <span>&nbsp;</span> {element.course}
                        </Col>
                        <Col>
                          Level: <span>&nbsp;</span> {element.level}
                        </Col>
                        <Col>
                          Position: <span>&nbsp;</span> {searchParam}
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <div className="text-end mt-3">
                            <>
                              Total number of votes:{" "}
                              {countVotes(element.counts)}
                            </>
                          </div>
                        </Col>
                      </Row>
                    </AccordionBody>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
