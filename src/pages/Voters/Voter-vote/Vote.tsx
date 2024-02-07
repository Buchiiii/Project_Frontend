import { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../services/controller/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetElectionHook } from "../../hooks/get-elections-hook";
import { GetElectionRoles } from "../../hooks/get-election-roles-hook";
import VoteModal from "./Vote-modal";
import CandidateList from "./Candidate-list";
import SelectRole from "../../../components/Select-role";

export const Vote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");
  const [votedCandidateId, setVotedCandidateId] = useState("");
  const election = GetElectionHook(id as string);
  const roles = GetElectionRoles(id as string);

  const date: number = new Date().getTime();

  const vote = async () => {
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
    }
  };

  return (
    <>
      {election ? (
        <>
          {election.startDate <= date ? (
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
                            <SelectRole
                              roles={roles}
                              setSearchParam={setSearchParam}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col>
                        <CandidateList
                          searchParam={searchParam}
                          id={id as string}
                          setVotedCandidateId={setVotedCandidateId}
                        />
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
                        <span style={{ fontSize: "30px" }}>
                          Election is over
                        </span>
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
                    <span style={{ fontSize: "30px" }}>
                      Election has not started
                    </span>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </>
      ) : (
        <>
          <Container className="h-100 pt-4 ps-5 pe-5">
            <Row className="border rounded bg-light h-75 align-items-center">
              <Col className="text-center  ">
                <Spinner animation="border" />
              </Col>
            </Row>
          </Container>
        </>
      )}

      <VoteModal vote={vote} />
    </>
  );
};
