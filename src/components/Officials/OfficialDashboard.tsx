import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../controller/api";

type Profile = {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  title: string;
};
export const OfficialDashboard = () => {
  const [profile, setProfile] = useState<null | Profile>(null);
  const id = JSON.parse(window.localStorage.getItem("ID") as string);
  const token = JSON.parse(window.localStorage.getItem("Token") as string);
  console.log(token);

  const getUser = async () => {
    try {
      const response = await API.get(`officials/profile/${id}`);
      console.log(response);
      setProfile(response.data);
    } catch (err) {}
  };
  const fullName = profile?.title + ". " + profile?.lastName;

  const greeting = (name: string) => {
    const currentDate = new Date();
    const timestamp = currentDate.getHours();
    let greeting = "hey";

    if (Number(timestamp) < 12 && Number(timestamp) >= 0) {
      greeting = "Good morning, " + name;
    }

    if (Number(timestamp) >= 12 && Number(timestamp) < 16) {
      greeting = "Good afternoon, " + name;
    }

    if (Number(timestamp) >= 16) {
      greeting = "Good evening, " + name;
    }

    return greeting;
  };

  console.log(greeting("buchi"));

  useEffect(() => {
    getUser();
  }, []);

  // const fetchResponse=()=>{
  //     try{
  //         const response= await API.get('officials/profile');
  //         console.log(response);
  //     }
  //     catch(err){

  // }

  // useEffect(()=>{

  // },[])
  return (
    <>
      <div
        className="w-100 ps-5 pt-3 bg-light shadow"
        style={{ height: "10%" }}
      >
        <span style={{ fontSize: "30px" }} className="text-dark">
          {greeting(fullName)}
        </span>
      </div>

      <Container className=" h-75 ps-5 pe-5  ">
        <Row className=" align-items-center  h-100">
          <Col className=" ps-4 pt-4 h-50" lg={4}>
            <div
              className=" border-3 w-sm-75 "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>Officials: 2005</h2>
              </div>
            </div>
          </Col>

          <Col className="  ps-4 pt-4  h-50" lg={4}>
            <div
              className="  "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>Candidates: 3</h2>
              </div>
            </div>
          </Col>

          <Col className=" ps-4 pt-4  h-50" lg={4}>
            <div
              className="  "
              style={{
                width: "95%",
                height: "85%",
                borderRadius: "10%",
                backgroundColor: "pink",
              }}
            >
              <div className="align-items-center h-100 justify-content-center d-flex ">
                {" "}
                <h2 style={{ fontWeight: "bold" }}>Voters: 1000</h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
