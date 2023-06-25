import { Formik, Form } from "formik";

import { Col, Container, Row } from "react-bootstrap";
import { Input } from "../../Fields/inputField";
import * as Yup from "yup";
import { API } from "../../controller/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import image from "../../images/images (1).png"


const style = {
  backgroundImage: `url(${image})`,
  width: "100%",
  height: "100vh",
};

export const OfficialLogin = () => {
  const navigate = useNavigate();
  const validation = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const submit = async (values: { username: string; password: string }) => {
    try {
      const response = await API.post("officials/login", values);
      console.log(response);
      window.localStorage.setItem(
        "Token",
        JSON.stringify(response.data.accessToken)
      );
      window.localStorage.setItem("ID", JSON.stringify(response.data.id));
      navigate("/official/dashboard", { replace: true });

      //toast.success(response.data.message);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };
  return (
    <div >
      <Container fluid style={{ height: "100vh" }}>
        <Row className="h-100">
          
          <Col
          
            style={{
             
              background: "linear-gradient(to right, #191970, #778899, #708090)",
            }}
            className="h-100"
          >
            <Container className=" h-100">
              
              <Row className="h-100  justify-content-center align-items-center">
                <Col style={{borderRadius: "30px"}}  lg={5} className="bg-white shadow-lg border  ps-5 pe-5 pt-4 pb-5 ">
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
                  <span style={{fontSize: "20px"}}>Admin Login</span>
                </div>
                
                    <Formik
                      initialValues={{ username: "", password: "" }}
                      validationSchema={validation}
                      onSubmit={async (values) => {
                        await submit(values);
                      }}
                    >
                      {(formikProps) => {
                        return (
                          <Form className="ps-2">
                            <Input label="Username" required name="username" />
                            <Input type="password" label="Password" required name="password" />
                            <div className=" mt-3">
                              <span></span>
                              <a href="#" className="">
                                Forgot Password?{" "}
                              </a>
                            </div>

                            <div className="mt-3 text-center">
                              <button
                                type="submit"
                                style={{ backgroundColor: "#191970" }}
                                className="btn btn-lg w-100"
                                disabled={formikProps.isSubmitting}
                              >
                                <span className="text-white">Login</span>
                              </button>
                            </div>

                            <hr></hr>
                            
                            <ToastContainer />
                          </Form>
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
    // <div
    //   className=" "
    //   style={style}
    //   //style={{ width: "100%", height: "100vh", backgroundImage: "linear-gradient(#191970)" }}
    // >
    //   <Container className="h-100">
    //     <Row className="h-100    align-items-center justify-content-center ">
    //       <Col
    //         className=" ps-0 pe-0 bg-light border border-light shadow rounded"
    //         style={{ height: "52%" }}
    //         lg={5}
    //       >
    //         <Container className="h-100">
    //           <Row className="h-100">
    //             <Col className="h-100  ">
    //               <div className=" text-center pt-2 mt-4 mb-3">
    //                 <h5>Login as an admin</h5>
    //               </div>

                  // <div>
                  //   <Formik
                  //     initialValues={{ username: "", password: "" }}
                  //     validationSchema={validation}
                  //     onSubmit={async (values) => {
                  //       await submit(values);
                  //     }}
                  //   >
                  //     {(formikProps) => {
                  //       return (
                  //         <Form className="ps-2">
                  //           <Input label="Username" required name="username" />
                  //           <Input label="Password" required name="password" />
                  //           <div className=" mt-3">
                  //             <span></span>
                  //             <a href="#" className="">
                  //               Forgot Password?{" "}
                  //             </a>
                  //           </div>

                  //           <div className="mt-3 text-center">
                  //             <button
                  //               type="submit"
                  //               style={{ backgroundColor: "#191970" }}
                  //               className="btn btn-lg w-100"
                  //               disabled={formikProps.isSubmitting}
                  //             >
                  //               <span className="text-white">Login</span>
                  //             </button>
                  //           </div>

                  //           <hr></hr>
                  //           <div className="text-center mt-1 ">
                  //             <a href="/">Login as a voter</a>
                  //           </div>
                  //           <ToastContainer />
                  //         </Form>
                  //       );
                  //     }}
                  //   </Formik>
                  // </div>
    //             </Col>
    //           </Row>
    //         </Container>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};
