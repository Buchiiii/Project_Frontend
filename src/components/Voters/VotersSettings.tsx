import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const VoterSettings=()=>{
    const navigate= useNavigate()
    return (
      <Container>
        <Row>
            <Col>
            <div className="pt-4 ps-5">
                <h1>Settings</h1>
                <p className="text-muted">Change account settings</p>
            </div>
            </Col>
            
        </Row>

        <Row className="p-5 ">
            <Col>
            <div className="border border-3 rounded">
                <button onClick={()=>{navigate('/voters/settings/changepassword')}} className="w-100 pt-4 pb-4 text-start btn "> <h4 style={{fontSize: "25px"}}><i className="me-2 font-weight-bold bi bi-lock"></i>Change Password</h4> </button>
            </div>
            </Col>
        </Row>
      </Container>
    )
}