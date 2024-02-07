import { GetModalShowHide } from "../../hooks/get-modal-show-hide";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";

interface IVoteModalProps {
  vote: () => Promise<void>;
}
const VoteModal = ({ vote }: IVoteModalProps) => {
  const { show, handlehide } = GetModalShowHide();

  return (
    <>
      <Modal centered show={show} onHide={handlehide}>
        <ModalHeader closeButton />
        <ModalBody>
          <p>Are you sure you want to vote for this candidate</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button onClick={handlehide} className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={async () => {
                await vote();
                handlehide();
              }}
              className="btn btn-primary"
            >
              Vote
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VoteModal;
