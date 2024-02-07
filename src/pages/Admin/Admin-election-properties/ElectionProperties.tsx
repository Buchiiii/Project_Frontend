import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GetElectionHook } from "../../hooks/get-elections-hook";
import { GetElectionRoles } from "../../hooks/get-election-roles-hook";
import { convertTimeStampToDate } from "../../../utils/Convert-timestamp-to-date";
import AdminEditStartDateModal from "./Admin-edit-start-date-modal";
import AdminEditNameModal from "./Admin-edit-name-modal";
import AdminEditEndDateModal from "./Admin-edit-end-date-modal";
import AdminDeleteRoleModal from "./Admin-delete-role-modal";
import AdminDeleteLevelModal from "./Admin-delete-level-modal";
import AdminDeleteCourseModal from "./Admin-delete-course-modal";
import AdminAddRoleModal from "./Admin-add-role-modal";
import AdminAddLevelModal from "./Admin-add-level-modal";
import AdminAddCourseModal from "./Admin-add-course-modal";

export const ELectionProperties = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const election = GetElectionHook(id as string);

  const roles = GetElectionRoles(id as string);
  const [nameShow, setNameShow] = useState(false);
  const [startDateShow, setStartDateShow] = useState(false);
  const [endDateShow, setEndDateShow] = useState(false);
  const [levelShow, setLevelShow] = useState(false);
  const [courseShow, setCourseShow] = useState(false);
  const [roleShow, setRoleShow] = useState(false);
  const [deleteLevelShow, setDeleteLevelShow] = useState(false);
  const [deleteCourseShow, setDeleteCourseShow] = useState(false);
  const [deleteRoleShow, setDeleteRoleShow] = useState(false);
  const [deleteLevel, setDeleteLevel] = useState("");
  const [deleteCourse, setDeleteCourse] = useState("");
  const [deleteRole, setDeleteRole] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
                      </Row>

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

      <AdminEditStartDateModal
        id={id as string}
        startDate={startDate}
        setStartDate={setStartDate}
        startDateShow={startDateShow}
        startdatehandlehide={startdatehandlehide}
      />

      <AdminEditNameModal
        id={id as string}
        nameShow={nameShow}
        namehandlehide={namehandlehide}
      />

      <AdminEditEndDateModal
        id={id as string}
        endDate={endDate}
        endDateShow={endDateShow}
        enddatehandlehide={enddatehandlehide}
        setEndDate={setEndDate}
      />

      <AdminDeleteRoleModal
        deleteRole={deleteRole}
        deleteRoleShow={deleteRoleShow}
        deleterolehandlehide={deleterolehandlehide}
      />

      <AdminDeleteLevelModal
        id={id as string}
        deleteLevel={deleteLevel}
        deleteLevelShow={deleteLevelShow}
        deletelevelhandlehide={deletelevelhandlehide}
      />

      <AdminDeleteCourseModal
        id={id as string}
        deleteCourse={deleteCourse}
        deleteCourseShow={deleteCourseShow}
        deletecoursehandlehide={deletecoursehandlehide}
      />

      <AdminAddRoleModal
        id={id as string}
        roleShow={roleShow}
        rolehandlehide={rolehandlehide}
      />

      <AdminAddLevelModal
        levelShow={levelShow}
        levelhandlehide={levelhandlehide}
        id={id as string}
      />

      <AdminAddCourseModal
        id={id as string}
        courseShow={courseShow}
        coursehandlehide={coursehandlehide}
      />
    </>
  );
};
