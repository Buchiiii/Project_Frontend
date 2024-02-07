import { Row, Col, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../services/controller/api";

import "react-datepicker/dist/react-datepicker.css";
import { IElectionForCreateElectionForm } from "../../modal";
import AdminCreateElectionForm from "./Admin-create-election-form";

const AdminCreateElection = () => {
  const navigate = useNavigate();

  const submit = async (values: IElectionForCreateElectionForm) => {
    try {
      const response = await API.post("officials/election", values);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/official/election");
      }, 1000);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="pt-5 ps-5 d-flex w-100">
              <div className="w-25">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    navigate("/official/election");
                  }}
                >
                  Go back
                </button>
              </div>

              <div className="ps-5 w-75 ">
                <h3>New Election</h3>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <AdminCreateElectionForm submit={submit} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCreateElection;
