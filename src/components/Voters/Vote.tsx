import { Field } from "formik";
import { useEffect, useState } from "react";
import {
  Accordion,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../controller/api";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

type Electionn = {
  id: string;
  name: string;
  course: string[];
  level: string[];
  startDate: number;
  endDate: number;
  createdDate: number;
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

export const Vote = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<null | electionRole[]>(null);
  const [candidates, setCandidates] = useState<null | Candidate[]>(null);
  const [votedCandidateId, setVotedCandidateId] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [show, setShow] = useState(false);
  const [election, setElection] = useState<Electionn | null>(null);
  const navigate = useNavigate();
  const date: number = new Date().getTime();

  const handleshow = () => {
    setShow(true);
  };

  const handlehide = () => {
    setShow(false);
  };

  const getElection = async () => {
    try {
      const response = await API.get(`elections/${id}`);
      setElection(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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

  const votee = async () => {
    try {
      const response = await API.post(`voters/vote/${id}`, {
        candidateId: votedCandidateId,
        role: searchParam,
      });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
      //   // toast.error(error.response?.data.message)
    }
  };

  useEffect(() => {
    getRoles();
    getElection();
  }, []);

  useEffect(() => {
    getCandidates();
  }, [searchParam]);
  return (
    <>
    {election ? <>{ election.startDate <= date ? (
        <>
          {election.endDate > date ? (
            <>
              <Container fluid="lg" className="h-100">
                <Row className=" ">
                  <Col>
                    <div>
                      <button
                        onClick={() => {
                          navigate("/voters/election");
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
                    <h1>Candidates</h1>
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
                      <div className="mb-3">
                        <Accordion className="mt-2">
                          <Accordion.Item eventKey={`${index + 1}`}>
                            <Accordion.Header>
                              Candidate {""} {index + 1}
                            </Accordion.Header>
                            <AccordionBody>
                              <Row className="mt-3">
                                <Col className="">
                                  Last Name:<span>&nbsp;</span>{" "}
                                  {element.lastName}
                                </Col>

                                <Col className="">
                                  First Name:<span>&nbsp;</span>{" "}
                                  {element.firstName}
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
                                  <div className="text-end">
                                    <button
                                      onClick={() => {
                                        setVotedCandidateId(element.id);
                                        handleshow();
                                      }}
                                      className="btn btn-primary"
                                    >
                                      Vote
                                    </button>
                                    <ToastContainer />
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
          ) : (
            <>
              <Container className="h-100 pt-4 ps-5 pe-5">
              <Row className=" mb-4 ">
                  <Col>
                    <div>
                      <button
                        onClick={() => {
                          navigate("/voters/election");
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
                <Row className="border rounded bg-light h-75 align-items-center">
                  <Col className="text-center  ">
                  <span style={{fontSize: "30px"}}>Election is over</span>
                  </Col>
                </Row>
                </Container>
            </>
          )}
        </>
      ) : (
        <>
         <Container className="h-100 pt-4 ps-5 pe-5">
              <Row className=" mb-4 ">
                  <Col>
                    <div>
                      <button
                        onClick={() => {
                          navigate("/voters/election");
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
                <Row className="border rounded bg-light h-75 align-items-center">
                  <Col className="text-center  ">
                  <span style={{fontSize: "30px"}}>Election has not started</span>
                  </Col>
                </Row>
                </Container>
        </>
      )}
</> : <><Container className="h-100 pt-4 ps-5 pe-5">
              <Row className="border rounded bg-light h-75 align-items-center">
                <Col className="text-center  ">
                 <Spinner animation="border"/>
                </Col>
              </Row>
            </Container></> }
      
      <Modal centered show={show} onHide={handlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to vote for this candidate</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={handlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={async () => {
                await votee();
                handlehide();
              }}
              className="btn btn-primary"
            >
              Vote
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
