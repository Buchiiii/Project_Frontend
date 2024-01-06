import { AxiosError } from "axios";
import { Formik, Form } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../components/inputField";
import { API } from "../../controller/api";
import * as Yup from "yup";

export const OfficialChangePassword = () => {
  const navigate = useNavigate();

  const initialvalues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validate = Yup.object({
    newPassword: Yup.string().required("This field cannot be left blank"),
    confirmPassword: Yup.string()
      .required("This field cannot be left blank")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const submit = async (values: { newPassword: string }) => {
    try {
      const response = await API.put("officials/resetPassword", values);
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {

        window.localStorage.clear();
        window.location.reload()
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
          <Col>
            <Formik
              initialValues={initialvalues}
              validationSchema={validate}
              onSubmit={async (values, submitProps) => {
                const value = {
                  newPassword: values.newPassword,
                };
                await submit(value);
              }}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Input
                      name="newPassword"
                      label="New Password"
                      type="password"
                      required
                      // style={styles.labelstyle}
                    />
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                      //style={styles.labelstyle}
                    />
                    <div className="mb-5 text-end">
                      <button
                        type="submit"
                        disabled={formikProps.isSubmitting}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <ToastContainer />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};
