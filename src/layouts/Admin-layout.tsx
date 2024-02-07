import { ReactNode, useState } from "react";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Row,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleshow = () => {
    setShow(true);
  };

  const handlehide = () => {
    setShow(false);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Container fluid className="h-100">
        <Row className="h-100 pt   ">
          <Col
            lg={3}
            className="h-lg-100 h-sm-75  pt-lg-3 pt-sm-2"
            style={{
              backgroundColor: "#191970",
            }}
          >
            <Nav
              variant="pills"
              className="ms-2 mt-lg-5 mt-sm-3 pt-lg-5 flex-column"
            >
              <Nav.Item className="w-100 mb-4 ">
                <NavLink
                  to="/official/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white nav-link active"
                      : "text-white nav-link"
                  }
                >
                  <span className="">
                    <i className="me-2 bi bi-pie-chart"></i>
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Dashboard
                  </span>
                </NavLink>
              </Nav.Item>

              <Nav.Item className="w-100 mb-4 ">
                <NavLink
                  to="/official/candidate"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white nav-link active"
                      : "text-light nav-link"
                  }
                >
                  <span>
                    <i className="me-2 bi bi-person-fill"></i>
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Candidates
                  </span>
                </NavLink>
              </Nav.Item>
              <Nav.Item className="w-100 mb-4 ">
                <NavLink
                  to="/official/election"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white nav-link active"
                      : "text-light nav-link"
                  }
                >
                  <span>
                    <i className="me-2 bi bi-person-badge"></i>
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Election
                  </span>
                </NavLink>
              </Nav.Item>
              <Nav.Item className="w-100 mb-4 ">
                <NavLink
                  to="/official/result"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white nav-link active"
                      : "text-white nav-link"
                  }
                >
                  <span className="">
                    <i className="me-2 bi bi-file-earmark-text"></i>
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Results
                  </span>
                </NavLink>
              </Nav.Item>
              <Nav.Item className="w-100 mb-4 ">
                <NavLink
                  to="/official/settings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white nav-link active"
                      : "text-white nav-link"
                  }
                >
                  <span className="">
                    <i className="me-2 bi bi-gear-fill"></i>
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Settings
                  </span>
                </NavLink>
              </Nav.Item>

              <Nav.Item className="w-100 mb-4  ">
                <span className="mt-2 ps-3 ">
                  <i className="text-danger mt-1  bi bi-box-arrow-right"></i>
                </span>{" "}
                <button
                  style={{ fontFamily: "lato", fontWeight: "bolder" }}
                  onClick={() => {
                    handleshow();
                  }}
                  className="  btn pt-0 ps-1 "
                >
                  <span className="text-light" style={{ fontSize: "20px" }}>
                    Log out
                  </span>
                </button>
              </Nav.Item>
            </Nav>
          </Col>

          <Col className="h-100 w-100 ps-0 pe-0">
            <div className="h-100">{children}</div>
          </Col>
        </Row>
      </Container>
      <Modal centered show={show} onHide={handlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to log out?</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={handlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={() => {
                window.localStorage.clear();
                navigate("/");
                handlehide();
              }}
              className="btn btn-danger"
            >
              Log out
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};
