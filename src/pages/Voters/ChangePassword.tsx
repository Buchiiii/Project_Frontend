import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { API } from "../../controller/api";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { Row, Col, Container } from "react-bootstrap";
import { Input } from "../../components/inputField";

type style = {
  labelstyle: React.CSSProperties;
};
let styles: style;
styles = {
  labelstyle: {
    fontFamily: "lato",
    fontSize: "20px",
    color: "#000000",
  },
};

// export const Changepassword = () => {
//   const navigate = useNavigate();
//   const initialvalues = {
//     newPassword: "",
//     confirmPassword: "",
//   };
//   const validate = Yup.object({
//     password: Yup.string().required("This field cannot be left blank"),
//     newPassword: Yup.string().required("This field cannot be left blank"),
//     confirmPassword: Yup.string()
//       .required("This field cannot be left blank")
//       .oneOf([Yup.ref("newPassword")], "Passwords must match"),
//   });

//   const submit = async (values: { newPassword: string }) => {
//     try {
//       const response = await API.post("voters/resetPassword", values);
//       console.log(response);
//       toast.success(response.data.message);

//       setTimeout(() => {
//         window.localStorage.clear();
//         navigate(0);
//       }, 2000);
//     } catch (err) {
//       const error = err as AxiosError;
//       if (error.response?.status === 401) {
//         if (err instanceof AxiosError) {
//           toast.error(err.response?.data.message);
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Row>
//           <Col>
//             <div className="pt-5 ps-5 mb-5 d-flex w-100">
//               <div className="w-25">
//                 <button
//                   type="button"
//                   className="btn btn-light"
//                   onClick={() => {
//                     navigate(`/voters/settings`);
//                   }}
//                 >
//                   Go back
//                 </button>
//               </div>
//               <div></div>
//               <div className="ps-5 w-75 ">
//                 <h3>Change Password</h3>
//               </div>
//             </div>
//             <Formik
//               initialValues={initialvalues}
//               validationSchema={validate}
//               onSubmit={async (values, submitProps) => {
//                 // const value = {
//                 //   newPassword: values.newPassword,
//                 // };
//                 // await submit(value);
//                 console.log(values);
//               }}
//             >
//               {(formikprops) => {
//                 return (
//                   <>
//                     <Form>
//                       {/* <Input
//                         name="password"
//                         label="Current Password"
//                         type="password"
//                         style={styles.labelstyle}
//                         required
//                       /> */}
//                       <Input
//                         name="newPassword"
//                         label="New Password"
//                         type="password"
//                         required
//                         style={styles.labelstyle}
//                       />
//                       <Input
//                         name="confirmPassword"
//                         label="Confirm Password"
//                         type="password"
//                         required
//                         style={styles.labelstyle}
//                       />
//                       <div className="mb-5 text-end">
//                         <button
//                           type="submit"
//                           //disabled={formikprops.isSubmitting }
//                           className="btn btn-primary"
//                         >
//                           Updateee
//                         </button>
//                       </div>
//                     </Form>
//                   </>
//                 );
//               }}
//             </Formik>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

export const Changepassword = () => {
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
      const response = await API.put("voters/resetPassword", values);
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {
        window.localStorage.clear();
        navigate('/');
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
                  navigate("/voters/settings");
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
                      style={styles.labelstyle}
                    />
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                      style={styles.labelstyle}
                    />
                    <div className="mb-5 text-end">
                      <button
                        type="submit"
                        disabled={formikProps.isSubmitting }
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <ToastContainer/>
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
