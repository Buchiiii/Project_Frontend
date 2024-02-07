import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { Input } from "../../../components/inputField";
import * as Yup from "yup";
import { API } from "../../../services/controller/api";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

const VoterLoginForm = () => {
  const navigate = useNavigate();
  const validation = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const submit = async (values: { username: string; password: string }) => {
    try {
      const response = await API.post("voters/generateOtp", values);
      console.log(response);
      window.localStorage.setItem("ID", JSON.stringify(response.data.id));
      navigate("/voter/otp", { replace: true });
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };
  return (
    <>
      {" "}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validation}
        onSubmit={async (values) => {
          await submit(values);
        }}
      >
        {(formikProps) => {
          return (
            <Form className="ps-2">
              <Input label="Matric Number" required name="username" />
              <Input
                type="password"
                label="Password"
                required
                name="password"
              />
              <div className=" mt-3">
                <span></span>
                <a href="#" className="">
                  Forgot Password?{" "}
                </a>
              </div>

              <div className="mt-3 text-center">
                <button
                  type="submit"
                  style={{ backgroundColor: "#191970" }}
                  className="btn btn-lg w-100"
                  disabled={
                    formikProps.isSubmitting ||
                    !formikProps.isValid ||
                    !formikProps.dirty
                  }
                >
                  <span className="text-white">Login</span>
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
export default VoterLoginForm;
