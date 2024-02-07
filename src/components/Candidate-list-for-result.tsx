import { Accordion, Row, Col } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import GetElectionCandidates from "../pages/hooks/get-election-candidates";
import { ICount } from "../pages/modal";

interface ICandidateListResultProps {
  searchParam: string;
  id: string;
}

const CandidateListForResult = ({
  searchParam,
  id,
}: ICandidateListResultProps) => {
  const candidates = GetElectionCandidates(id as string, searchParam);
  const countVotes = (countArray: ICount[]) => {
    let newArray: ICount[] = [];
    if (countArray.length > 0) {
      newArray = countArray.filter((element) => {
        return element.electionId === id;
      });
    }

    return newArray[0].count;
  };
  return (
    <>
      {candidates?.map((element, index) => (
        <div key={element.id} className="mb-3">
          <Accordion className="mt-2">
            <Accordion.Item eventKey={`${index + 1}`}>
              <Accordion.Header>
                Candidate {index + 1} : <span>&nbsp;</span> <span>&nbsp;</span>{" "}
                {element.lastName} {element.firstName}
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
                    <div className="text-end mt-3">
                      <>Total number of votes: {countVotes(element.counts)}</>
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

export default CandidateListForResult;
