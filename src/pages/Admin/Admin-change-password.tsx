import { AxiosError } from "axios";

import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API } from "../../services/controller/api";
import ChangePasswordForm from "../../components/Change-password-form";

export const AdminChangePassword = () => {
  const navigate = useNavigate();

  const submit = async (values: { newPassword: string }) => {
    try {
      const response = await API.put("officials/resetPassword", values);
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {
        window.localStorage.clear();
        window.location.reload();
        navigate("/");
      }, 3000);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="mt-2">
              <button
                onClick={() => {
                  navigate("/official/settings");
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
            <h1>Change password</h1>
          </Col>
        </Row>

        <Row>
          <ChangePasswordForm submit={submit} />
        </Row>
      </Container>
    </>
  );
};
