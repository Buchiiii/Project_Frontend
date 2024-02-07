import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VoterRegistrationForm from "./Voter-registration-form";

export const VoterRegister = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container fluid style={{ height: "100vh" }}>
        <Row className="h-100">
          <Col
            style={{
              background:
                "linear-gradient(to right, #191970, #778899, #708090)",
            }}
            className="h-100"
          >
            <Container className=" h-100">
              <Row className="h-100  justify-content-center align-items-center">
                <Col
                  style={{ borderRadius: "30px" }}
                  lg={7}
                  className="bg-white shadow-lg border  ps-5 pe-5 pt-3 pb-2 "
                >
                  <div className=" mb-1">
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="btn btn-light"
                    >
                      <span>
                        <i className="bi bi-arrow-left"></i>
                      </span>
                    </button>
                  </div>
                  <div className="text-center mb-4">
                    <span style={{ fontSize: "20px" }}>Voter Registration</span>
                  </div>
                  <VoterRegistrationForm/>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
