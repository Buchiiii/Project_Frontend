import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { API } from "../../../services/controller/api";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";
import { GetDepartmentsHook } from "../../hooks/get-departments-hook";
import { IDepartment } from "../../modal";
import { GetElectionHook } from "../../hooks/get-elections-hook";

interface IAdminAddCourseModal {
  id: string;
  courseShow: boolean;
  coursehandlehide: () => void;
}
const AdminAddCourseModal = ({
  id,
  courseShow,
  coursehandlehide,
}: IAdminAddCourseModal) => {
  const department = GetDepartmentsHook();
  let departmentArray: IDepartment[];
  const election = GetElectionHook(id as string);
  
  const initialValuesForCourse = {
    name: "",
  };
  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
  });
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

  if (department) {
    departmentArray = department.filter((element) => {
      return !election?.course.includes(element.name);
    });
  }
  return (
    <>
      <Modal show={courseShow} onHide={coursehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
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
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminAddCourseModal
