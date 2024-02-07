import { Col, Container, Row } from "react-bootstrap";

import { greeting } from "../../utils/Greeting";
import { GetAdminHook } from "../hooks/get-admin-hook";
import { GetCountHook } from "../hooks/get-count-hook";

export const AdminDashboard = () => {
  const admin = GetAdminHook();
  const count = GetCountHook();
  const fullName = "Mr. " + admin?.lastName || "";

  return (
    <>
      <div
        className="w-100 ps-5 pt-3 bg-light shadow"
        style={{ height: "10%" }}
      >
        <span style={{ fontSize: "30px" }} className="text-dark">
          {greeting(fullName)}
        </span>
      </div>

      <Container className=" h-75 ps-5 pe-5  ">
        <Row className=" align-items-center justify-content-center  h-100">
          <Col className="  ps-4 pt-4  h-50" lg={4}>
            <div
              className="  "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>
                  Candidates: {count?.candidateTotal || ""}
                </h2>
              </div>
            </div>
          </Col>

          <Col className=" ps-4 pt-4  h-50" lg={4}>
            <div
              className="  "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>
                  Voters: {count?.voterTotal || ""}
                </h2>
              </div>
            </div>
          </Col>

          <Col className=" ps-4 pt-4  h-50" lg={4}>
            <div
              className="  "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>
                  Elections: {count?.electionTotal || ""}
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
