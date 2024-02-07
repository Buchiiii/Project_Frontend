import { Input } from "../../../components/inputField";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { getTimestamp } from "../../../utils/Get-timestamp";
import { IElectionForCreateElectionForm, IStyle } from "../../modal";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

interface IAdminCreateElectionFormProps {
  submit: (values: IElectionForCreateElectionForm) => Promise<void>;
}

let styles: IStyle = {
  labelstyle: {
    fontFamily: "lato",
    fontSize: "20px",
    color: "#000000",
  },
};

const AdminCreateElectionForm = ({ submit }: IAdminCreateElectionFormProps) => {
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const initialValues = {
    name: "",
    course: [],
    level: [],
    startDate: +"",
    endDate: +"",
    createdDate: getTimestamp(),
  };
  const validation = Yup.object({
    name: Yup.string().required("This field is required"),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values) => {
          values.startDate = new Date(startdate).getTime();
          values.endDate = new Date(enddate).getTime();
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
  );
};

export default AdminCreateElectionForm;
