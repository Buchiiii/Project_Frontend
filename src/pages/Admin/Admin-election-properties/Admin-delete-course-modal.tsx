import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

import { API } from "../../../services/controller/api";
import { toast } from "react-toastify";
interface IAdminDeleteCourseProps {
  id: string;
  deleteCourseShow: boolean;
  deletecoursehandlehide: () => void;
  deleteCourse: string;
}
const AdminDeleteCourseModal = ({
  id,
  deleteCourse,
  deleteCourseShow,
  deletecoursehandlehide,
}: IAdminDeleteCourseProps) => {
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
  return (
    <>
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

export default AdminDeleteCourseModal;
