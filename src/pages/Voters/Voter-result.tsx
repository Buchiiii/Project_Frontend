import { useState } from "react";
import { Accordion, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import "react-toastify/dist/ReactToastify.css";
import { GetElectionRoles } from "../hooks/get-election-roles-hook";
import GetElectionCandidates from "../hooks/get-election-candidates";
import { GetElectionHook } from "../hooks/get-elections-hook";
import { ICount } from "../modal";
import SelectRole from "../../components/Select-role";
import CandidateListForResult from "../../components/Candidate-list-for-result";

export const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roles = GetElectionRoles(id as string);
  const [searchParam, setSearchParam] = useState("");
  const election = GetElectionHook(id as string);
  const date: number = new Date().getTime();

  return (
    <>
      {election ? (
        <>
          {election.startDate < date ? (
            <>
              {" "}
              <Container fluid="lg" className="pt-2 h-100">
                <Row className=" ">
                  <Col>
                    <div>
                      <button
                        onClick={() => {
                          navigate("/voters/result");
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
                        <SelectRole
                          roles={roles}
                          setSearchParam={setSearchParam}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className=" mt-4">
                  <Col>
                    <CandidateListForResult
                      searchParam={searchParam}
                      id={id as string}
                    />
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <>
              {" "}
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
                    <span style={{ fontSize: "30px" }}>
                      Election is not over
                    </span>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <Container className="h-100">
            <Row className="h-100 align-items-center">
              <Col className="text-center">
                <Spinner animation="border" />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
