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
import { Input } from "../../../components/inputField";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface IAdminEditNameModalProps {
  id: string;
  nameShow: boolean;
  namehandlehide: () => void;
}
const AdminEditNameModal = ({
  id,
  nameShow,
  namehandlehide,
}: IAdminEditNameModalProps) => {
  const initialValuesForName = {
    name: "",
  };

  const validation = Yup.object({
    // name: Yup.string().required("This field is required"),
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

  return (
    <>
      <Modal show={nameShow} onHide={namehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
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
            <button type="submit">Update</button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminEditNameModal;
