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

interface IAdminAddRoleModal {
  id: string;
  roleShow: boolean;
  rolehandlehide: () => void;
}
const AdminAddRoleModal = ({
  id,
  roleShow,
  rolehandlehide,
}: IAdminAddRoleModal) => {
  const initialValuesForRole = {
    role: "",
  };

  const validationForRole = Yup.object({
    role: Yup.string().required("ROle is required"),
  });

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
  return (
    <>
      <Modal show={roleShow} onHide={rolehandlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik
                  initialValues={initialValuesForRole}
                  validationSchema={validationForRole}
                  onSubmit={async (value) => {
                    await submitForRole(value);
                    //await getElection();
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
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminAddRoleModal;
