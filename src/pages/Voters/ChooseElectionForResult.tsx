import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetPaginatedElectionHookForVoter } from "../hooks/get-paginated-election-hook-for-voters";
import Paginate from "../../components/Paginate";

export const ChooseElectionForElection = () => {
  const limit = 4;
  const { election, setElection, totalPages } =
    GetPaginatedElectionHookForVoter(1, limit);

  const handlePageChange = async (data: { selected: number }) => {
    console.log(data.selected + 1);
    try {
      const { election: page } = GetPaginatedElectionHookForVoter(
        data.selected + 1,
        limit
      );
      setElection(page);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid="lg" className="h-100 ">
      <Row className="">
        <Col>
          <div className="pt-4 ps-5">
            <h1>Choose an election</h1>
          </div>
        </Col>
      </Row>

      <Row className="h-75 gx-5 pb-4 gy-3 mt-5 ms-5 me-5 bg-light border rounded">
        {election ? (
          <>
            {" "}
            {election.length > 0 ? (
              <>
                {election.map((element) => (
                  <Col lg={6} className=" forcolumn h-50" key={element.id}>
                    <Link
                      className="text-decoration-none text-dark "
                      to={`/voters/result/${element.id}`}
                    >
                      <Row className="h-100    justify-content-center">
                        <div className="daybookBranchBox  border  ">
                          <Container className="h-100 ">
                            <Row className="h-100 text-center align-content-center">
                              <Col>{element.name}</Col>
                            </Row>
                          </Container>
                        </div>
                      </Row>
                    </Link>
                  </Col>
                ))}
              </>
            ) : (
              <>
                <div className="text-center pt-5 pb-5 mt-5 mb-5">
                  <p>No election available</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {" "}
            <Container className="h-100 pt-4 ps-5 pe-5">
              <Row className="border rounded bg-light h-75 align-items-center">
                <Col className="text-center  ">
                  <Spinner animation="border" />
                </Col>
              </Row>
            </Container>
          </>
        )}

        <Paginate totalPages={totalPages} handlePageChange={handlePageChange} />
      </Row>
    </Container>
  );
};
