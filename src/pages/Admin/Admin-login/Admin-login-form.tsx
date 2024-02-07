import { Input } from "../../../components/inputField";
import * as Yup from "yup";
import { API } from "../../../services/controller/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik, Form } from "formik";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const validation = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const submit = async (values: { username: string; password: string }) => {
    try {
      const response = await API.post("officials/login", values);
      console.log(response);
      window.localStorage.setItem(
        "Token",
        JSON.stringify(response.data.accessToken)
      );
      window.localStorage.setItem("ID", JSON.stringify(response.data.id));
      navigate("/official/dashboard", { replace: true });
    } catch (err) {
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
              <Input label="Username" required name="username" />
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
                  disabled={formikProps.isSubmitting}
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

export default AdminLoginForm;
