import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(to right, #191970, #778899, #708090)",
        }}
      >
        <Container fluid className="h-100 ">
          <Row className="h-100  align-items-center justify-content-center">
            <Col
              style={{ borderRadius: "40px" }}
              xs={6}
              lg={3}
              xss={12}
              className=" pe-5 shadow-lg h-75    bg-white"
            >
              <Container className="h-100">
                <Row className="h-100 align-items-center">
                  <Col>
                    <Row className="ms-3 mb-5">
                      <Col>
                        <div className="text-center w-100">
                          <button
                          onClick={() => navigate("/candidate/register")}
                            style={{ backgroundColor: "#191970" }}
                            className="w-100 btn text-white"
                          >
                            Register as candidate
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row className="ms-3 mb-5">
                      <Col>
                        <div className="text-center">
                          <button
                            onClick={() => navigate("/voter/register")}
                            style={{ backgroundColor: "#191970" }}
                            className="w-100 btn text-white"
                          >
                            Register as voter
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row className="ms-3 mb-5">
                      <Col>
                        <div className="text-center">
                          <button
                            onClick={() => navigate("/voter")}
                            style={{ backgroundColor: "#191970" }}
                            className="w-100 btn text-white"
                          >
                            Login as voter
                          </button>
                        </div>
                      </Col>
                    </Row>

                    <Row className="ms-3">
                      <Col>
                        <div className="text-center">
                          <button
                            onClick={() => navigate("/official")}
                            style={{ backgroundColor: "#191970" }}
                            className="w-100 btn text-white"
                          >
                            Login as admin
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
            {/* <Col style= {{borderBottomLeftRadius: "40px", borderTopLeftRadius: "40px", backgroundColor: "#191970"}} className="h100 "></Col>
          <Col style= {{borderBottomRightRadius: "40px", borderTopRightRadius: "40px", backgroundColor: "white"}}className="h100">hello</Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
};
