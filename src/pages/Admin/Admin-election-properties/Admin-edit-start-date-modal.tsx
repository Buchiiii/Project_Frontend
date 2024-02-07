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
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

interface IAdminEditStartDateModalProps {
  id: string;
  startDateShow: boolean;
  startdatehandlehide: () => void;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const AdminEditStartDateModal = ({
  id,
  startDate,
  setStartDate,
  startDateShow,
  startdatehandlehide,
}: IAdminEditStartDateModalProps) => {
  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
  });
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
  return (
    <>
      <Modal show={startDateShow} onHide={startdatehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
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
            <button type="submit">Update</button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminEditStartDateModal;
