import { Accordion, Row, Col, ToastContainer } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import GetElectionCandidates from "../../hooks/get-election-candidates";
import { GetModalShowHide } from "../../hooks/get-modal-show-hide";

interface ICandidateListProps {
  searchParam: string;
  setVotedCandidateId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

const CandidateList = ({searchParam,setVotedCandidateId,id}: ICandidateListProps) => {
  const candidates = GetElectionCandidates(id as string, searchParam);
  const { handleshow } = GetModalShowHide();
  return (
    <>
      {candidates?.map((element, index) => (
        <div className="mb-3">
          <Accordion className="mt-2">
            <Accordion.Item eventKey={`${index + 1}`}>
              <Accordion.Header>
                Candidate {""} {index + 1}
              </Accordion.Header>
              <AccordionBody>
                <Row className="mt-3">
                  <Col className="">
                    Last Name:<span>&nbsp;</span> {element.lastName}
                  </Col>

                  <Col className="">
                    First Name:<span>&nbsp;</span> {element.firstName}
                  </Col>

                  <Col className="">
                    Other Names: <span>&nbsp;</span>
                    {element.otherName}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    Course: <span>&nbsp;</span> {element.course}
                  </Col>
                  <Col>
                    Level: <span>&nbsp;</span> {element.level}
                  </Col>
                  <Col>
                    Position: <span>&nbsp;</span> {searchParam}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <div className="text-end">
                      <button
                        onClick={() => {
                          setVotedCandidateId(element.id);
                          handleshow();
                        }}
                        className="btn btn-primary"
                      >
                        Vote
                      </button>
                      <ToastContainer />
                    </div>
                  </Col>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default CandidateList;
