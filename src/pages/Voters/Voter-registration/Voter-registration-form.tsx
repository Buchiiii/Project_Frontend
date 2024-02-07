import { getTimestamp } from "../../../utils/Get-timestamp";
import { GetDepartmentsHook } from "../../hooks/get-departments-hook";
import { GetLevelsHook } from "../../hooks/get-levels-hook";
import { Field, Formik, Form } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../components/inputField";
import { API } from "../../../services/controller/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Row, Col } from "react-bootstrap";

interface ISubmitProps {
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  matricNo: string;
  course: string;
  level: string;
  registrationDate: number;
}

const VoterRegistrationForm = () => {
  const navigate = useNavigate();
  const department = GetDepartmentsHook();
  const level = GetLevelsHook();

  const validation = Yup.object({
    lastName: Yup.string().required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    otherName: Yup.string().required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    matricNo: Yup.string().required("This field is required"),
  });

  const initialValues = {
    lastName: "",
    firstName: "",
    otherName: "",
    email: "",
    matricNo: "",
    course: "",
    level: "",
    registrationDate: getTimestamp(),
  };
  
  const array: string[] = [];
  if (department) {
    department.forEach((element) => {
      array.push(element.name);
    });
  }

  const submit = async (values: ISubmitProps) => {
    try {
      const response = await API.post("voters/register", values);
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/voter");
      }, 2000);
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
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values, submitProps) => {
          await submit(values);
          submitProps.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form className="ps-2">
              <Row>
                <Col>
                  <Input label="Last Name" required name="lastName" />
                </Col>

                <Col>
                  <Input label="First Name" required name="firstName" />
                </Col>
              </Row>

              <Input label="Other Name" required name="otherName" />

              <Row>
                <Col>
                  <Input label="Matric Number" required name="matricNo" />
                </Col>

                <Col>
                  <Input label="Email" required name="email" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3 ">
                    <label className="form-label text-dark">
                      Course
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <Field className="form-select" as="select" name="course">
                      <option defaultValue={"Select a level"}>
                        Select a course
                      </option>
                      {department?.map((element) => (
                        <option key={element.id} value={element.name}>
                          {element.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </Col>

                <Col>
                  <div className="mb-3 ">
                    <label className="form-label text-dark">
                      Level
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <Field className="form-select" as="select" name="level">
                      <option defaultValue={"Select a level"}>
                        Select a level
                      </option>
                      {level?.map((element) => (
                        <option key={element.id} value={element.name}>
                          {element.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  style={{ backgroundColor: "#191970" }}
                  className="btn btn-lg w-100"
                  disabled={formikProps.isSubmitting}
                >
                  <span className="text-white">Register</span>
                </button>
              </div>

              <hr></hr>

              <ToastContainer />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default VoterRegistrationForm;
