import { Formik, Form } from "formik";

import { Col, Container, Row } from "react-bootstrap";
import { Input } from "../../components/inputField";
import * as Yup from "yup";
import { API } from "../../controller/api";
import image from "../images/E-voting.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

const style = {
  background: "linear-gradient(to right, #191970, #778899, #708090)",
  width: "100%",
  height: "100vh",
};

export const OTPlogin = () => {
  const navigate = useNavigate();
  const [second, setseconds] = useState(59);
  const [minute, setminute] = useState(1);
  const id: string | null = JSON.parse(
    window.localStorage.getItem("ID") as string
  );
  const validation = Yup.object({
    // username: Yup.string().required("This field is required"),
    // password: Yup.string().required("This field is required"),
  });

  const submit = async (values: { otp: string }) => {
    try {
      const response = await API.post(
        `voters/login/${id}?otp=${values.otp}`,
        {}
      );
      console.log(response);
      window.localStorage.setItem(
        "Token",
        JSON.stringify(response.data.accessToken)
      );
      //window.localStorage.setItem("ID", JSON.stringify(response.data.id));
      navigate("/voters/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    let myinterval = setInterval(() => {
      if (second > 0) {
        setseconds(second - 1);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(myinterval);
        } else {
          setminute(minute - 1);
          setseconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myinterval);
    };
  });
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
                  className="bg-white shadow-lg border h-50 ps-5 pe-5 pt-4 pb-5 "
                >
                  <div className=" mb-2">
                    <button
                      onClick={() => {
                        navigate("/voter");
                      }}
                      className="btn btn-light"
                    >
                      <span>
                        <i className="bi bi-arrow-left"></i>
                      </span>
                    </button>
                  </div>
                  <div className="text-center mb-5">
                    <span style={{ fontSize: "20px" }}>OTP</span>
                  </div>

                  <Formik
                    initialValues={{ otp: "" }}
                    validationSchema={validation}
                    onSubmit={async (values) => {
                      await submit(values);
                    }}
                  >
                    {(formikProps) => {
                      return (
                        <>
                          <Form className="ps-2">
                            <div>
                              <OtpInput
                                value={formikProps.values.otp}
                                onChange={(value) =>
                                  formikProps.setFieldValue("otp", value)
                                }
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={{
                                  height: "40px",
                                  marginRight: "10px",
                                  marginLeft: "10px",
                                  width: "40px",
                                  border: "2px solid black",
                                  borderRadius: "5px",
                                }}
                                containerStyle={{
                                  marginBottom: "50px",
                                  justifyContent: "center",
                                }}
                              />
                            </div>

                            <div className="mt-5 text-center">
                              <div className="text-end me-3 mb-1">
                                {minute === 0 && second === 0 ? (
                                  <span
                                    onClick={async () => {
                                      setminute(1);
                                      setseconds(59);
                                      try {
                                        const response = await API.post(
                                          `voters/resendOtp/${id}`
                                        );
                                        console.log(response);
                                        toast.success(response.data.message);
                                      } catch (err) {
                                        console.log(err);
                                        const error = err as AxiosError;
                                        if (error.response?.status === 400) {
                                          if (err instanceof AxiosError) {
                                            toast.error(
                                              err.response?.data.message
                                            );
                                          }
                                        }
                                      }
                                    }}
                                    className="btn btn-light"
                                  >
                                    {" "}
                                    Resend{" "}
                                  </span>
                                ) : (
                                  <span>
                                    {" "}
                                    {minute}:
                                    {second < 10 ? `0${second}` : second}
                                  </span>
                                )}
                              </div>
                              <button
                                type="submit"
                                style={{ backgroundColor: "#191970" }}
                                className="btn btn-lg w-100"
                                disabled={
                                  formikProps.isSubmitting ||
                                  !formikProps.isValid ||
                                  !formikProps.dirty
                                }
                              >
                                <span className="text-white">Verify</span>
                              </button>
                            </div>

                            <hr></hr>

                            <ToastContainer />
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
