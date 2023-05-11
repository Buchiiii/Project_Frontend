import { Formik, Form} from "formik";

import { Col, Container, Row } from "react-bootstrap";
import { Input } from "../Fields/inputField";
import * as Yup from "yup"
import { API } from "../controller/api";
import image from "../images/E-voting.jpg";

const style={
    background: 'linear-gradient(to left, #191970, #778899, #708090)',
    width: '100%',
    height: '100vh'
}

export const Login = () => {



    const validation = Yup.object({

    })

    const submit=(values:{username:string, password:string})=>{
      try{
       // const response= await API.post()
      }
      catch(err){

      }
    }
  return (
    <div
      className=" "
      style={style}
      //style={{ width: "100%", height: "100vh", backgroundImage: "linear-gradient(#191970)" }}
    >
      <Container className="h-100">
        <Row className="h-100    align-items-center justify-content-center ">
          <Col
            className=" ps-0 pe-0 bg-light border border-light shadow rounded"
            style={{height: "52%"}}
            lg={8}
          >
            <Container fluid className="h-100">
              <Row className="h-100 pe-0">
                <Col className="h-100  ">
                  <div className=" text-center pt-2 mt-4 mb-3">
                    <h5>Login</h5>
                  </div>

                  <div>
                    <Formik initialValues={{username: '' , password: ''}} validationSchema={validation} onSubmit={()=>{}}>
                        {(formikProps)=>{
                            return(
                                <Form className="ps-5">
                                    <Input label="Username" name="username"/>
                                    <Input label="Password" name="password"/>
                                    <div className=" mt-3"><span></span><a href="#" className="">Forgot Password? </a></div>
                                    
                                    <div className="mt-3 text-center"><button type="submit" style={{backgroundColor: "#191970"}} className="btn btn-lg w-100"><span className="text-white">Login</span></button></div>
                                    
                                    <hr></hr>
                                    <div className="text-center mt-1 "><a href="/official">Login as an official</a></div>
                                
                                </Form>
                            )
                        }}

                    </Formik>
                  </div>
                </Col>

                <Col className="h-100 pe-0 ">
                  <div className="h-100 w-100">
                    <img src={image} className="rounded image-fluid h-100 w-100" alt="Online voting"/>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
