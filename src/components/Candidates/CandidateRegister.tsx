import { AxiosError } from "axios";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../Fields/inputField";
import { API } from "../../controller/api";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

type electionRole = {
  id: string;
  role: string;
};

type level = {
  id: string;
  name: string;
};

type department = {
  id: string;
  name: string;
};

type Election = {
  id: string;
  name: string;
  course: string[];
  level: string[];
};

export const CandidateRegister = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState<level[] | null>(null);
  const [department, setDepartment] = useState<department[] | null>(null);
  const [searchParamDep, setSearchParamDep] = useState("");
  const [searchParamlevel, setSearchParamlevel] = useState("");
  const [election, setElection] = useState<Election[] | null>(null);
  const [electionId, setElectionId] = useState("");
  const [roles, setRoles] = useState<null | electionRole[]>(null);

  const date = new Date();
  const timeStamp = date.getTime();

  const initialValues = {
    lastName: "",
    firstName: "",
    otherName: "",
    email: "",
    matricNo: "",
    course: "",
    level: "",
    registrationDate: timeStamp,
  };

  type values = {
    lastName: string;
    firstName: string;
    otherName: string;
    email: string;
    matricNo: string;
    course: string;
    level: string;
    registrationDate: number;
  };
  const validation = Yup.object({
    lastName: Yup.string().required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    otherName: Yup.string().required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    matricNo: Yup.string().required("This field is required"),
    course: Yup.string().required("This field is required"),
    level: Yup.string().required("This field is required"),
  });

  const getDepartment = async () => {
    try {
      const response = await API.get("department");
      setDepartment(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  const getLevel = async () => {
    try {
      const response = await API.get("level");
      setLevel(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  

  const getElection = async () => {
    try {
      const response = await API.get(
        `elections/newcandidate/elections?course=${searchParamDep}&level=${searchParamlevel}`
      );
      setElection(response.data);
      console.log(response);
    } catch (err) {}
  };

  const getRoles = async () => {
    try {
      const response = await API.get(`elections/roles/${electionId}`);

      setRoles(response.data);
      console.log(response);
    } catch (err) {}
  };

  const submit = async (values: values) => {
    try {
      const response = await API.post("candidate/register", values);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);

      //toast.success(response.data.message);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    getDepartment();
    getLevel();
  }, []);

  useEffect(() => {
    if (searchParamDep !== "" && searchParamlevel !== "") {
      getElection();
    }
  }, [searchParamDep, searchParamlevel]);

  useEffect(() => {
    if (electionId !== "") {
      getRoles();
    }
  }, [electionId]);
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
                    <span style={{ fontSize: "20px" }}>
                       Candidate Registration
                    </span>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={async (values, submitProps) => {
                      await submit(values);
                      submitProps.resetForm();
                    }}
                  >
                    {(formikProps) => {
                      const DepartmentOnChange = (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        setSearchParamDep(e.target.value);
                        return formikProps.handleChange(e);
                      };

                      const LevelOnChange = (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        setSearchParamlevel(e.target.value);
                        return formikProps.handleChange(e);
                      };

                      const ElectionOnChange = (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        setElectionId(e.target.value);
                        return formikProps.handleChange(e);
                      };
                      return (
                        <Form className="ps-2">
                          <Row>
                            <Col>
                              <Input
                                label="Last Name"
                                required
                                name="lastName"
                              />
                            </Col>

                            <Col>
                              <Input
                                label="First Name"
                                required
                                name="firstName"
                              />
                            </Col>
                          </Row>

                          <Input label="Other Name" required name="otherName" />

                          <Row>
                            <Col>
                              <Input
                                label="Matric Number"
                                required
                                name="matricNo"
                              />
                            </Col>

                            <Col>
                              <Input label="Email" required name="email" />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <div className="mb-3 ">
                                <label className="form-label text-dark">
                                  Course
                                  <span className="text-danger ms-1">*</span>
                                </label>

                                <Field
                                  className="form-select"
                                  as="select"
                                  name="course"
                                  onChange={DepartmentOnChange}
                                >
                                  <option defaultValue={"Select a level"}>
                                    Select a course
                                  </option>
                                  {department?.map((element) => (
                                    <option
                                      key={element.id}
                                      value={element.name}
                                    >
                                      {element.name}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3 ">
                                <label className="form-label text-dark">
                                  Level
                                  <span className="text-danger ms-1">*</span>
                                </label>

                                <Field
                                  className="form-select"
                                  as="select"
                                  name="level"
                                  onChange={LevelOnChange}
                                >
                                  <option defaultValue={"Select a level"}>
                                    Select a level
                                  </option>
                                  {level?.map((element) => (
                                    <option
                                      key={element.id}
                                      value={element.name}
                                    >
                                      {element.name}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <div className="mb-3 ">
                                <label className="form-label text-dark">
                                  Election
                                  <span className="text-danger ms-1">*</span>
                                </label>

                                <Field
                                  className="form-select"
                                  as="select"
                                  name="election"
                                  onChange={ElectionOnChange}
                                >
                                  <option defaultValue={"Select a level"}>
                                    Select an election
                                  </option>
                                  {election?.map((element) => (
                                    <option key={element.id} value={element.id}>
                                      {element.name}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3 ">
                                <label className="form-label text-dark">
                                  Role
                                  <span className="text-danger ms-1">*</span>
                                </label>

                                <Field
                                  className="form-select"
                                  as="select"
                                  name="role"
                                >
                                  <option defaultValue={"Select a level"}>
                                    Select a role
                                  </option>
                                  {roles?.map((element) => (
                                    <option
                                      key={element.id}
                                      value={element.role}
                                    >
                                      {element.role}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </Col>
                          </Row>

                          <div className="mt-4 text-center">
                            <button
                              type="submit"
                              style={{ backgroundColor: "#191970" }}
                              className="btn btn-lg w-100"
                              disabled={formikProps.isSubmitting}
                            >
                              <span className="text-white">Register</span>
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
  );
};
