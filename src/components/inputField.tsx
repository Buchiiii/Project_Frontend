import { ErrorMessage, FastField } from "formik";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

export const Input = ({
  name,
  label,
  type,
  required,
  style,
  ...rest
}: inputProps) => {
  return (
    <div className="mb-3">
      {required ? (
        <label className="form-label text-dark" style={style}>
          {label}
          <span className="text-danger ms-1">*</span>
        </label>
      ) : (
        <label className="form-control">
          {label}
          <span className="text-muted">(optional)</span>
        </label>
      )}

      <FastField name={name} className=" form-control" type={type} {...rest} />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};
