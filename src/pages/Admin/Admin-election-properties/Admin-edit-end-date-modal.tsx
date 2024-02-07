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

interface IAdminEditEndDateModalProps {
  id: string;
  endDateShow: boolean;
  enddatehandlehide: () => void;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const AdminEditEndDateModal = ({
  id,
  endDate,
  endDateShow,
  enddatehandlehide,
  setEndDate,
}: IAdminEditEndDateModalProps) => {
  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
  });
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
  return (
    <>
      <Modal show={endDateShow} onHide={enddatehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
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
            <button type="submit">Update</button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminEditEndDateModal;
