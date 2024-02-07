import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

import { API } from "../../../services/controller/api";

import { toast } from "react-toastify";

interface IAdminDeleteRoleModalProps {
  deleteRoleShow: boolean;
  deleterolehandlehide: () => void;
  deleteRole: string;
}

const AdminDeleteRoleModal = ({
  deleteRoleShow,
  deleterolehandlehide,
  deleteRole,
}: IAdminDeleteRoleModalProps) => {
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
  return (
    <>
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
    </>
  );
};

export default AdminDeleteRoleModal;
