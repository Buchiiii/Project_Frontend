import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../services/controller/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetVoterHook } from "../hooks/get-voter-hook";
import { greeting } from "../../utils/Greeting";

export const VoterDashboard = () => {
  const profile = GetVoterHook();

  const fullName = profile?.lastName + " " + profile?.firstName || "";

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

      <Row className="m-5 p-5 justify-content-center  rounded bg-light ">
        <Calendar
          className=" react-calendar"
          tileClassName="text-decoration-none"
        ></Calendar>
      </Row>
    </Container>
  );
};
