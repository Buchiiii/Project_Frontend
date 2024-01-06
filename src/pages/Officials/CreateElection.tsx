import { Row, Col, Container } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../controller/api";
import { Input } from "../../components/inputField";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type election = {
  name: string;
  course: string[];
  level: string[];
  startDate: number;
  endDate: number;
  createdDate: number;
};

type level = {
  id: string;
  name: string;
};

type department = {
  id: string;
  name: string;
};

export const CreateElection = () => {
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const [level, setLevel] = useState<level[] | null>(null);
  const [department, setDepartment] = useState<department[] | null>(null);

  const getDepartment = async () => {
    try {
      const response = await API.get("department");
      setDepartment(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  const getLevel = async () => {
    try {
      const response = await API.get("level");
      setLevel(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  const submit = async (values: election) => {
    try {
      const response = await API.post("officials/election", values);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/official/election");
      }, 1000);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const initialValues = {
    name: "",
    course: [],
    level: [],
    startDate: +"",
    endDate: +"",
    createdDate: timestamp,
  };
  const validation = Yup.object({
    name: Yup.string().required("This field is required"),
  });

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

  useEffect(() => {
    getDepartment();
    getLevel();
    console.log(currentDate);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="pt-5 ps-5 d-flex w-100">
              <div className="w-25">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    navigate("/official/election");
                  }}
                >
                  Go back
                </button>
              </div>

              <div className="ps-5 w-75 ">
                <h3>New Election</h3>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={async (values) => {
                  values.startDate= new Date(startdate).getTime();
                  values.endDate= new Date(enddate).getTime();
                  await submit(values);
                  
                }}
              >
                {(formikprops) => {
                  return (
                    <Form className="ms-5 me-5 pt-5">
                      <Input
                        name="name"
                        label="Election Name"
                        type="text"
                        required
                        style={styles.labelstyle}
                      />
                      <div className="mb-3">
                        <Row>
                          <Col lg={2}>
                            <label>Select start date</label>
                          </Col>
                          <Col>
                            <DatePicker
                            className="form-control"
                              selected={startdate}
                              showTimeSelect
                              onChange={(date: Date) => {
                                setStartDate(date);
                              }}
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className="">
                        <Row>
                          <Col lg={2}>
                            <label>Select end date</label>
                          </Col>

                          <Col>
                            <DatePicker
                            className="form-control"
                              selected={enddate}
                              showTimeSelect
                              onChange={(date: Date) => {
                                setEndDate(date);
                              }}
                            />
                          </Col>
                        </Row>

                        <span></span>
                      </div>

                      <div className="text-end mt-3">
                        <button
                          disabled={formikprops.isSubmitting}
                          type="submit"
                          className="btn btn-primary"
                        >
                          Add New Entry
                        </button>
                        <ToastContainer />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};
