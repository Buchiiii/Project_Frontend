import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { API } from "../../../services/controller/api";

import { toast } from "react-toastify";

interface IAdminDeleteLevelModalProps {
  id: string;
  deleteLevelShow: boolean;
  deletelevelhandlehide: () => void;
  deleteLevel: string;
}
const AdminDeleteLevelModal = ({
  id,
  deleteLevel,
  deleteLevelShow,
  deletelevelhandlehide,
}: IAdminDeleteLevelModalProps) => {
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

  return (
    <>
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
    </>
  );
};

export default AdminDeleteLevelModal;
