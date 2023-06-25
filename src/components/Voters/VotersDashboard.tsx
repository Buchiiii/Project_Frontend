import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../controller/api";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type Profile = {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  dateOfBirth: string;
  course: string;
  matricNo: string;
  level: string;
  registrationDate: string;
};

export const VoterDashboard = () => {
  const [profile, setProfile] = useState<null | Profile>(null);
  const id = JSON.parse(window.localStorage.getItem("ID") as string);

  
  const fullName = profile?.lastName + " " + profile?.firstName || "";

  const getUser = async () => {
    try {
      const response = await API.get(`voters`);
      console.log(response);
      setProfile(response.data);
    } catch (err) {}
  };

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

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <div className="p-4">
          <span style={{ fontSize: "30px" }} className="text-dark">
          {greeting(fullName)}
        </span>
          </div>
        </Col>
      </Row>

      <Row className="m-5 p-5 justify-content-center  rounded bg-light " >

        
        <Calendar className=" react-calendar"  tileClassName="text-decoration-none"></Calendar>
        </Row>
    </Container>
  );
};
