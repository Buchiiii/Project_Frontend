import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { API } from "../../services/controller/api";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { Row, Col, Container } from "react-bootstrap";
import { Input } from "../../components/inputField";
import ChangePasswordForm from "../../components/Change-password-form";

type style = {
  labelstyle: React.CSSProperties;
};
let styles: style;
styles = {
  labelstyle: {
    fontFamily: "lato",
    fontSize: "20px",
    color: "#000000",
  },
};


export const VoterChangepassword = () => {
  const navigate = useNavigate();



    const submit = async (values: { newPassword: string }) => {
    try {
      const response = await API.put("voters/resetPassword", values);
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {
        window.localStorage.clear();
        navigate('/');
      }, 3000);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="mt-2">
              <button
                onClick={() => {
                  navigate("/voters/settings");
                }}
                className="btn btn-light"
              >
                <span>
                  <i className="bi bi-arrow-left"></i>
                </span>
              </button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h1>Change password</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <ChangePasswordForm submit={submit}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};
