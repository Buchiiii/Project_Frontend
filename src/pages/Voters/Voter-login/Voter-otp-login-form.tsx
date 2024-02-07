import { GetVoterId } from "../../../utils/Get-voter-id";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import OtpInput from "react-otp-input";
import * as Yup from "yup";
import { API } from "../../../services/controller/api";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import VoterOtpTimer from "./Voter-otp-login-timer";

const VoterOtpLoginForm = () => {
  const navigate = useNavigate();

  const id = GetVoterId();

  const validation = Yup.object({});

  const submit = async (values: { otp: string }) => {
    try {
      const response = await API.post(
        `voters/login/${id}?otp=${values.otp}`,
        {}
      );
      console.log(response);
      window.localStorage.setItem(
        "Token",
        JSON.stringify(response.data.accessToken)
      );
      //window.localStorage.setItem("ID", JSON.stringify(response.data.id));
      navigate("/voters/dashboard", { replace: true });
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
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validation}
        onSubmit={async (values) => {
          await submit(values);
        }}
      >
        {(formikProps) => {
          return (
            <>
              <Form className="ps-2">
                <div>
                  <OtpInput
                    value={formikProps.values.otp}
                    onChange={(value) =>
                      formikProps.setFieldValue("otp", value)
                    }
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      height: "40px",
                      marginRight: "10px",
                      marginLeft: "10px",
                      width: "40px",
                      border: "2px solid black",
                      borderRadius: "5px",
                    }}
                    containerStyle={{
                      marginBottom: "50px",
                      justifyContent: "center",
                    }}
                  />
                </div>

                <div className="mt-5 text-center">
                  <div className="text-end me-3 mb-1">
                    <VoterOtpTimer />
                  </div>
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
                    <span className="text-white">Verify</span>
                  </button>
                </div>

                <hr></hr>

                <ToastContainer />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default VoterOtpLoginForm;
