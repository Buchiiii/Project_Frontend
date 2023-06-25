import { useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../controller/api";
import { Field, Form, Formik, FormikProps } from "formik";
import { Input } from "../../Fields/inputField";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

type Candidate = {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  dateOfBirth: string;
  course: string;
  matricNo: string;
  level: string;
  registrationDate: string;
};

type Electionn = {
  id: string;
  name: string;
  course: string[];
  level: string[];
  startDate: number;
  endDate: number;
  createdDate: number;
  candidates: Candidate[];
  // {
  // 		id: string,
  // 		lastName: string,
  // 		firstName: string,
  // 		otherName: string,
  // 		email: string,
  // 		dateOfBirth: string,
  // 		course: string,
  // 		matricNo: string,
  // 		level: string,
  // 		registrationDate: string;
  // 	}
};

type level = {
  id: string;
  name: string;
};

type department = {
  id: string;
  name: string;
};

type electionRole = {
  id: string;
  role: string;
};

export const ELectionProperties = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [election, setElection] = useState<Electionn | null>(null);
  const [nameShow, setNameShow] = useState(false);
  const [startDateShow, setStartDateShow] = useState(false);
  const [endDateShow, setEndDateShow] = useState(false);
  const [levelShow, setLevelShow] = useState(false);
  const [courseShow, setCourseShow] = useState(false);
  const [roleShow, setRoleShow] = useState(false);
  const [deleteLevelShow, setDeleteLevelShow] = useState(false);
  const [deleteCourseShow, setDeleteCourseShow] = useState(false);
  const [deleteRoleShow, setDeleteRoleShow] = useState(false);
  const [department, setDepartment] = useState<department[] | null>(null);
  const [level, setLevel] = useState<level[] | null>(null);
  const [roles, setRoles] = useState<null | electionRole[]>(null);
  const [deleteLevel, setDeleteLevel] = useState("");
  const [deleteCourse, setDeleteCourse] = useState("");
  const [deleteRole, setDeleteRole] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const courseFormRef = useRef<FormikProps<any>>(null);
  const roleFormRef = useRef<FormikProps<any>>(null);
  const levelFormRef = useRef<FormikProps<any>>(null);
  const nameFormRef = useRef<FormikProps<any>>(null);
  const startDateFormRef = useRef<FormikProps<any>>(null);
  const EnddateFormRef = useRef<FormikProps<any>>(null);

  let departmentArray: department[];
  let levelArray: level[];

  const initialValuesForName = {
    name: "",
  };

  const initialValuesForRole = {
    role: "",
  };

  const initialValuesForCourse = {
    name: "",
  };

  const initialValuesForLevel = {
    name: "",
  };

  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
  });

  const validationForRole = Yup.object({
    role: Yup.string().required("ROle is required"),
  });

  const submitForName = async (value: { name: string }) => {
    try {
      const response = await API.post(`officials/election/name/${id}`, value);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForStartDate = async (value: { startDate: number }) => {
    try {
      const response = await API.post(
        `officials/election/startDate/${id}`,
        value
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForEndDate = async (value: { endDate: number }) => {
    try {
      const response = await API.post(
        `officials/election/endDate/${id}`,
        value
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForRole = async (value: { role: string }) => {
    try {
      const response = await API.post(`officials/election/role/${id}`, value);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForLevel = async (value: { name: string }) => {
    try {
      const response = await API.post(`officials/election/level/${id}`, value);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForCourse = async (value: { name: string }) => {
    try {
      const response = await API.post(`officials/election/course/${id}`, value);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForDeleteCourse = async (value: { name: string }) => {
    try {
      const response = await API.post(
        `officials/election/deletecourse/${id}`,
        value
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForDeleteLevel = async (value: { name: string }) => {
    try {
      const response = await API.post(
        `officials/election/deletelevel/${id}`,
        value
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForDeleteRole = async (roleId: string) => {
    try {
      const response = await API.delete(
        `officials/election/deleterole/${roleId}`
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const getElection = async () => {
    try {
      const response = await API.get(`elections/${id}`);
      setElection(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const getRoles = async () => {
    try {
      const response = await API.get(`elections/roles/${id}`);

      setRoles(response.data);
      console.log(response);
    } catch (err) {}
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

  const namehandleshow = () => {
    setNameShow(true);
  };

  const namehandlehide = () => {
    setNameShow(false);
  };

  const startdatehandleshow = () => {
    setStartDateShow(true);
  };

  const startdatehandlehide = () => {
    setStartDateShow(false);
  };

  const endsdatehandleshow = () => {
    setEndDateShow(true);
  };

  const enddatehandlehide = () => {
    setEndDateShow(false);
  };

  const levelhandleshow = () => {
    setLevelShow(true);
  };

  const levelhandlehide = () => {
    setLevelShow(false);
  };

  const coursehandleshow = () => {
    setCourseShow(true);
  };

  const coursehandlehide = () => {
    setCourseShow(false);
  };

  const rolehandleshow = () => {
    setRoleShow(true);
  };

  const rolehandlehide = () => {
    setRoleShow(false);
  };

  const deleterolehandleshow = () => {
    setDeleteRoleShow(true);
  };

  const deleterolehandlehide = () => {
    setDeleteRoleShow(false);
  };

  const deletecoursehandleshow = () => {
    setDeleteCourseShow(true);
  };

  const deletecoursehandlehide = () => {
    setDeleteCourseShow(false);
  };

  const deletelevelhandleshow = () => {
    setDeleteLevelShow(true);
  };

  const deletelevelhandlehide = () => {
    setDeleteLevelShow(false);
  };

  if (department) {
    departmentArray = department.filter((element) => {
      return !election?.course.includes(element.name);
    });
  }

  if (level) {
    levelArray = level.filter((element) => {
      return !election?.level.includes(element.name);
    });
  }
  useEffect(() => {
    getElection();
    getDepartment();
    getRoles();
    getLevel();
  }, []);

  function convertTimeStampToDate(timeStamp: any) {
    const formatedDate = new Date(timeStamp).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formatedDate;
  }

  useEffect(() => {
    if (election) {
      setStartDate(
        new Date(convertTimeStampToDate(Number(election?.startDate)))
      );

      setEndDate(new Date(convertTimeStampToDate(Number(election?.endDate))));
    }
  }, [election]);

  return (
    <>
      <Container className="pt-3">
        <Row className=" ">
          <Col>
            <div>
              <button
                onClick={() => {
                  navigate("/official/election");
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
          <Col className="">
            <>
              <div className=" text-center mb-5">
                {election ? (
                  <>
                    <div className="">
                      <span style={{ fontSize: "35px" }}>{election.name}</span>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="text-end mb-3">
                <button
                  className="me-3 btn btn-primary"
                  onClick={() => {
                    rolehandleshow();
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    <i className="bi bi-plus"></i>
                  </span>
                  Add New Role
                </button>
                <button
                  disabled={election?.course[0] === "All"}
                  className="me-3 btn btn-primary"
                  onClick={() => {
                    coursehandleshow();
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    <i className="bi bi-plus"></i>
                  </span>
                  Add New Course
                </button>
                <button
                  disabled={election?.level[0] === "All"}
                  className="btn btn-primary"
                  onClick={() => {
                    levelhandleshow();
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    <i className="bi bi-plus"></i>
                  </span>
                  Add New Level
                </button>
              </div>
              <div
                className={
                  election ? `border pb-2  rounded pt-3` : `pb-2   pt-3`
                }
              >
                {election ? (
                  <>
                    <Container>
                      <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Election Name</p>
                        </Col>
                        <Col xs={7} lg={7}>
                          <p>{election.name}</p>
                        </Col>
                        <Col xs={1} lg={1}>
                          <div className="text-end">
                            <button
                              onClick={() => namehandleshow()}
                              className="btn btn-sm btn-light"
                            >
                              <span>
                                <i className="bi  bi-pencil-square"></i>
                              </span>
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Level</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <Row className="gy-3  pb-4">
                            {election.level.length > 0 ? (
                              election.level.map((element) => (
                                <Col lg={4} className="">
                                  <div
                                    style={{
                                      borderRadius: "20px",
                                      width: "100%",
                                    }}
                                    className="p-1 ps-3 border shadow"
                                  >
                                    <div className="d-flex justify-content-between text-center">
                                      {element}
                                      <span className="ps-1">
                                        <button
                                          onClick={() => {
                                            setDeleteLevel(element);
                                            deletelevelhandleshow();
                                          }}
                                          style={{
                                            fontSize: "10px",
                                            paddingTop: "2px",
                                            paddingBottom: "2px",
                                            paddingRight: "10px",
                                            paddingLeft: "10px",
                                            borderRadius: "20px",
                                          }}
                                          className="btn btn-danger mb-1 me-2 "
                                        >
                                          x
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                              ))
                            ) : (
                              <>
                                <p>Add a level for this course</p>
                              </>
                            )}
                          </Row>
                        </Col>
                        {/* <Col><div className="text-end"><button className="btn btn-sm btn-light"><span><i className="bi  bi-pencil-square"></i></span></button></div></Col> */}
                      </Row>
                      <Row className=" mb-3 border-bottom ">
                        <Col xs={4} lg={4} className="">
                          <p>Course</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <Row className="gy-3 pb-4">
                            {election.course.length > 0 ? (
                              election.course.map((element) => (
                                <Col lg={4} className="">
                                  <div
                                    style={{
                                      borderRadius: "20px",
                                      width: "100%",
                                    }}
                                    className="p-1 ps-3 border shadow"
                                  >
                                    <div className="d-flex justify-content-between text-center">
                                      {element}
                                      <span className="ps-1">
                                        <button
                                          onClick={() => {
                                            setDeleteCourse(element);
                                            deletecoursehandleshow();
                                          }}
                                          style={{
                                            fontSize: "10px",
                                            paddingTop: "2px",
                                            paddingBottom: "2px",
                                            paddingRight: "10px",
                                            paddingLeft: "10px",
                                            borderRadius: "20px",
                                          }}
                                          className="btn btn-danger mb-1 me-2 "
                                        >
                                          x
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                              ))
                            ) : (
                              <>
                                <p>Add a course for this election</p>
                              </>
                            )}
                          </Row>
                        </Col>

                        {/* <Col><div className="text-end"><button className="btn btn-sm btn-light"><span><i className="bi  bi-pencil-square"></i></span></button></div></Col> */}
                      </Row>
                      <Row className=" mb-3 border-bottom ">
                        <Col xs={4} lg={4} className="">
                          <p>Roles</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <Row className="gy-3 pb-4">
                            {roles && roles.length > 0 ? (
                              roles.map((element) => (
                                <Col lg={4} className="">
                                  <div
                                    style={{
                                      borderRadius: "50px",
                                    }}
                                    className="p-1 ps-3 border shadow"
                                  >
                                    <div className="d-flex justify-content-between text-center">
                                      {element.role}
                                      <span className="ps-1">
                                        <button
                                          onClick={() => {
                                            setDeleteRole(element.id);
                                            deleterolehandleshow();
                                          }}
                                          style={{
                                            fontSize: "10px",
                                            paddingTop: "2px",
                                            paddingBottom: "2px",
                                            paddingRight: "10px",
                                            paddingLeft: "10px",
                                            borderRadius: "20px",
                                          }}
                                          className="btn btn-danger mb-1 me-2 "
                                        >
                                          x
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                              ))
                            ) : (
                              <>
                                <p>Add a role for this election</p>
                              </>
                            )}
                          </Row>
                        </Col>

                        {/* <Col><div className="text-end"><button className="btn btn-sm btn-light"><span><i className="bi  bi-pencil-square"></i></span></button></div></Col> */}
                      </Row>
                      {/* <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Created By</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <p>{branch.createdBy}</p>
                        </Col>
                            </Row>*/}
                      <Row className=" mb-3 border-bottom">
                        <Col xs={4} lg={4} className="">
                          <p>Start Date</p>
                        </Col>
                        <Col xs={7} lg={7}>
                          <p>
                            {convertTimeStampToDate(Number(election.startDate))}
                          </p>
                        </Col>
                        <Col xs={1} lg={1}>
                          <div className="text-end">
                            <button
                              onClick={() => startdatehandleshow()}
                              className="btn btn-sm btn-light"
                            >
                              <span>
                                <i className="bi  bi-pencil-square"></i>
                              </span>
                            </button>
                          </div>
                        </Col>
                      </Row>

                      <Row className=" mb-3 border-bottom">
                        <Col xs={4} lg={4} className="">
                          <p>End Date</p>
                        </Col>
                        <Col xs={7} lg={7}>
                          <p>
                            {convertTimeStampToDate(Number(election.endDate))}
                          </p>
                        </Col>
                        <Col xs={1} lg={1}>
                          <div className="text-end">
                            <button
                              onClick={() => endsdatehandleshow()}
                              className="btn btn-sm btn-light"
                            >
                              <span>
                                <i className="bi  bi-pencil-square"></i>
                              </span>
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <Row className=" mb-1">
                        <Col xs={4} lg={4} className="">
                          <p>Created Date</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <p>
                            {convertTimeStampToDate(
                              Number(election.createdDate)
                            )}
                          </p>
                        </Col>
                      </Row>

                      {/* <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Modified By</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <p>{element.modifiedBy}</p>
                        </Col>
                      </Row>
                      <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Modified Date</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          <p>
                            {branch.modifiedDate === null
                              ? ""
                              : convertTimeStampToDate(
                                  Number(branch.modifiedDate)
                                )}
                          </p>
                        </Col>
                      </Row>
                      <Row className="border-bottom mb-3">
                        <Col xs={4} lg={4} className="">
                          <p>Status</p>
                        </Col>
                        <Col xs={8} lg={8}>
                          {branch.isDisabled ? <p>Deactive</p> : <p>Active</p>}
                        </Col> */}

                      {/* <div className="text-end">
                        <button className="btn btn-primary">Update</button>
                    </div>
                     */}
                    </Container>
                  </>
                ) : (
                  <div className="mt-5 pt-5 text-center">
                    <Spinner animation="border"></Spinner>
                  </div>
                )}
              </div>
            </>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
      <Modal show={nameShow} onHide={namehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={nameFormRef}
                  initialValues={initialValuesForName}
                  validationSchema={validation}
                  onSubmit={async (value) => {
                    await submitForName(value);
                    namehandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Input
                          name="name"
                          label=" Enter new election name"
                          required
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={namehandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={() => {
                if (nameFormRef.current) {
                  nameFormRef.current.handleSubmit();
                }
              }}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal show={startDateShow} onHide={startdatehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={startDateFormRef}
                  initialValues={{ startDate: +"" }}
                  validationSchema={validation}
                  onSubmit={async (values: { startDate: number }) => {
                    values.startDate = startDate?.getTime() || 0;
                    await submitForStartDate(values);
                    startdatehandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row>
                          <Col className="">
                            <div className="mb-3">
                              <label>Select new start date</label>
                            </div>

                            <div className="text-center">
                              <ReactDatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date: Date) => {
                                  setStartDate(date);
                                }}
                                showTimeSelect
                              />
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={startdatehandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={() => {
                if (startDateFormRef.current) {
                  startDateFormRef.current.handleSubmit();
                }
              }}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal show={endDateShow} onHide={enddatehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={EnddateFormRef}
                  initialValues={{ endDate: +"" }}
                  validationSchema={validation}
                  onSubmit={async (values: { endDate: number }) => {
                    values.endDate = endDate?.getTime() || 0;
                    await submitForEndDate(values);
                    enddatehandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row>
                          <Col className="">
                            <div className="mb-3">
                              <label>Select new end date</label>
                            </div>

                            <div className="text-center">
                              <ReactDatePicker
                                className="form-control "
                                selected={endDate}
                                onChange={(date: Date) => {
                                  setEndDate(date);
                                }}
                                showTimeSelect
                              />
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={enddatehandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={() => {
                if (EnddateFormRef.current) {
                  EnddateFormRef.current.handleSubmit();
                }
              }}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal show={courseShow} onHide={coursehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={courseFormRef}
                  initialValues={initialValuesForCourse}
                  validationSchema={validation}
                  onSubmit={async (value) => {
                    await submitForCourse(value);
                    coursehandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <div className="mb-3 ">
                          <label className="form-label text-dark">
                            Add New Course
                            <span className="text-danger ms-1">*</span>
                          </label>

                          <Field
                            className="form-select"
                            as="select"
                            name="name"
                          >
                            <option defaultValue={"Select a course"}>
                              Select a course
                            </option>
                            <option value="All">All</option>
                            {departmentArray?.map((element) => (
                              <option key={element.id} value={element.name}>
                                {element.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-light">Cancel</button>
            <button
              onClick={() => {
                if (courseFormRef.current) {
                  courseFormRef.current.handleSubmit();
                }
              }}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal show={roleShow} onHide={rolehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={roleFormRef}
                  initialValues={initialValuesForRole}
                  validationSchema={validationForRole}
                  onSubmit={async (value) => {
                    await submitForRole(value);
                    await getElection();
                    rolehandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Input name="role" label=" Add New Role" required />
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={rolehandlehide} className="btn btn-light">
              Cancel
            </button>
          </div>
          <button
            type="submit"
            onClick={() => {
              if (roleFormRef.current) {
                roleFormRef.current.handleSubmit();
              }
            }}
            className="btn btn-primary"
          >
            Add
          </button>
        </ModalFooter>
      </Modal>

      <Modal show={levelShow} onHide={levelhandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  innerRef={levelFormRef}
                  initialValues={initialValuesForLevel}
                  validationSchema={validation}
                  onSubmit={async (value) => {
                    await submitForLevel(value);
                    levelhandlehide();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <div className="mb-3 ">
                          <label className="form-label text-dark">
                            Add New Course
                            <span className="text-danger ms-1">*</span>
                          </label>

                          <Field
                            className="form-select"
                            as="select"
                            name="name"
                          >
                            <option defaultValue={"Select a course"}>
                              Select a level
                            </option>
                            <option value="All">All</option>
                            {levelArray?.map((element) => (
                              <option key={element.id} value={element.name}>
                                {element.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={levelhandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={() => {
                if (levelFormRef.current) {
                  levelFormRef.current.handleSubmit();
                }
              }}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal centered show={deleteLevelShow} onHide={deletelevelhandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to delete level?</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={deletelevelhandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={async () => {
                const value = { name: deleteLevel };
                await submitForDeleteLevel(value);
                deletelevelhandlehide();
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal centered show={deleteRoleShow} onHide={deleterolehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to delete role?</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={deleterolehandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={async () => {
                await submitForDeleteRole(deleteRole);
                deleterolehandlehide();
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal centered show={deleteCourseShow} onHide={deletecoursehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to delete course?</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={deletecoursehandlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={async () => {
                const value = { name: deleteCourse };
                await submitForDeleteCourse(value);
                deletecoursehandlehide();
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
