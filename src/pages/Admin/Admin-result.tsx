import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import SelectRole from "../../components/Select-role";
import { GetElectionRoles } from "../hooks/get-election-roles-hook";
import CandidateListForResult from "../../components/Candidate-list-for-result";

export const AdminResult = () => {
  const { id } = useParams();
  const roles = GetElectionRoles(id as string);
  const [searchParam, setSearchParam] = useState("");

  const navigate = useNavigate();

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
                <SelectRole roles={roles} setSearchParam={setSearchParam} />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <CandidateListForResult
              searchParam={searchParam}
              id={id as string}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
