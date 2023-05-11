import { Col, Container, InputGroup, Row, Table } from "react-bootstrap"

export const OfficialList=()=>{
    return(
        <>
        <Container className="">
            <Row className="ps-5 pe-5">
                <Col >
                    <div className="text-center pt-4">
                        <span style={{fontSize: "40px"}}>Officials List</span>
                    </div>
                    <div className="pt-4">
            <InputGroup>
              <InputGroup.Text className="bg-light "><span><i className="bi bi-search"></i></span></InputGroup.Text>
              <input
                className="form-control ps-3"
                placeholder="Search by name "
              // disabled={patient ? false : true}
                onChange={(e)=>{
                  //const value=e.target.value;
                  
                }}
              />
              </InputGroup>
            </div>
            <Table hover className="mt-3" >
                        <thead className="border bg-light">
                          <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Party</td>
                            
                          </tr>
                        </thead>
                        <tbody></tbody>
                        </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}