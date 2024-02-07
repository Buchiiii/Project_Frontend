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
import { ILevel } from "../../modal";
import { GetLevelsHook } from "../../hooks/get-levels-hook";
import { GetElectionHook } from "../../hooks/get-elections-hook";

interface IAdminAddLevelMOdalProps {
  id: string;
  levelShow: boolean;
  levelhandlehide: () => void;
}
const AdminAddLevelModal = ({
  id,
  levelShow,
  levelhandlehide,
}: IAdminAddLevelMOdalProps) => {
  const level = GetLevelsHook();
  let levelArray: ILevel[];
  const election = GetElectionHook(id as string);

  const initialValuesForLevel = {
    name: "",
  };

  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
  });

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

  if (level) {
    levelArray = level.filter((element) => {
      return !election?.level.includes(element.name);
    });
  }
  return (
    <>
      <Modal show={levelShow} onHide={levelhandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminAddLevelModal;
