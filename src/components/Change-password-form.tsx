import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Input } from "./inputField";
import { Formik, Form } from "formik";

interface IChangePasswordFormProps {
  submit: (values: { newPassword: string }) => Promise<void>;
}

const ChangePasswordForm = ({ submit }: IChangePasswordFormProps) => {
  const initialvalues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validate = Yup.object({
    newPassword: Yup.string().required("This field cannot be left blank"),
    confirmPassword: Yup.string()
      .required("This field cannot be left blank")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  return (
    <>
      <Formik
        initialValues={initialvalues}
        validationSchema={validate}
        onSubmit={async (values, submitProps) => {
          const value = {
            newPassword: values.newPassword,
          };
          await submit(value);
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Input
                name="newPassword"
                label="New Password"
                type="password"
                required
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              />
              <div className="mb-5 text-end">
                <button
                  type="submit"
                  disabled={formikProps.isSubmitting}
                  className="btn btn-primary"
                >
                  Update
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

export default ChangePasswordForm;
