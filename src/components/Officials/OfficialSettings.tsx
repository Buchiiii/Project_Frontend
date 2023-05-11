import { Col, Container, InputGroup, Row } from "react-bootstrap"

export const OfficialSettings=()=>{
    return ( <>
        <Container>
            <Row>
                <Col>
                    <div className="text-center pt-4">
                        <span style={{fontSize: "40px"}}>Settings</span>
                    </div>
                    {/* <div className="pt-4">
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
            </div> */}
                </Col>
            </Row>
        </Container>
        </>)
}