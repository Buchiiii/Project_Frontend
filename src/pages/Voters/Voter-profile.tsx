import { Col, Container, Row } from "react-bootstrap";
import { GetVoterHook } from "../hooks/get-voter-hook";

export const VoterProfile = () => {
  const voter = GetVoterHook();
  return (
    <Container className="h-100">
      <Row>
        <Col>
          <div className="ps-5  pt-3">
            <span className="text-dark" style={{ fontSize: "40px" }}>
              Profile
            </span>
          </div>
        </Col>
      </Row>

      <Row className="m-5 pt-5 p-3 h-75 border rounded bg-light ">
        <Row className="">
          <Col>
            <div className="p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Last Name:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.lastName : ""}
              </span>
            </div>
          </Col>

          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>First Name:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.firstName : ""}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Other Name:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.otherName : ""}
              </span>
            </div>
          </Col>

          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Email:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.email : ""}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Matric Number:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.matricNo : ""}
              </span>
            </div>
          </Col>

          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Course:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.course : ""}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className=" p-3 shadow text-center  border rounded">
              <span style={{ fontSize: "20px" }}>Level:</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span style={{ fontSize: "20px" }}>
                {voter ? voter.level : ""}
              </span>
            </div>
          </Col>
          {/* 
            <Col>
          <div>
            <span style={{fontSize: "20px"}}>Course:</span>
            </div></Col> */}
        </Row>
      </Row>
    </Container>
  );
};
