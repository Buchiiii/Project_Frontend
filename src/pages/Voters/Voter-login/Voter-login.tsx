import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VoterLoginForm from "./Voter-login-form";

export const VoterLogin = () => {
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
                  lg={5}
                  className="bg-white shadow-lg border  ps-5 pe-5 pt-4 pb-5 "
                >
                  <div className=" mb-2">
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
                    <span style={{ fontSize: "20px" }}>Voter Login</span>
                  </div>
                  <VoterLoginForm/>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
