import { Field, ErrorMessage, FastField, useField } from "formik";
import { TextField } from '@mui/material'

type inputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  style?: React.CSSProperties;
};

export const Input = ({ name, label, type, required, style }: inputProps) => {
  const [field, meta]= useField(name)
  const configInputs= {
    ...field,
    label,
    type
    
  }

  
  // return(
  //   <div className="mb-3">

    
  //   <TextField required={required} fullWidth error={meta && meta.touched && meta.error ? true : false} helperText={meta && meta.touched && meta.error ? meta.error : null}  {...configInputs} />
  //   </div>
  // )
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

      <FastField name={name} className=" form-control" type={type} />
      <ErrorMessage name={name} component="div" className="text-danger"/>
    </div>
  );
};

// export const Input = ({
//     name,
//     label,
//     value,
//     special,
//     type,
//     readonly,
//     required,
//     style,
//     speciallabel,
//   }: inputProps) => {
//     return (
//       <>
//         {special ? (
//           <>
//             {speciallabel ? (
//               <>
//                 <div className="d-flex">
//                   <label
//                     className="form-label me-2 pt-1 text-dark"
//                     style={{ fontSize: "16px" }}
//                   >
//                     {label}
//                   </label>
//                   {readonly ? (
//                     <div className="mb-3">
//                       <FastField
//                         disabled
//                         value={value}
//                         className="form-control"
//                         name={name}
//                         id={name}
//                         type={type}
//                       />

//                       <ErrorMessage
//                         name={name}
//                         className="text-danger"
//                         component="div"
//                       />
//                     </div>
//                   ) : (
//                     <div className="">
//                       <FastField
//                         className="form-control"
//                         name={name}
//                         id={name}
//                         type={type}
//                       />
//                       <ErrorMessage
//                         name={name}
//                         className="text-danger"
//                         component="div"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="d-flex">
//                   <label className="form-label me-2 pt-1 text-dark" style={style}>
//                     {label}
//                   </label>
//                   {readonly ? (
//                     <div className="mb-3">
//                       <FastField
//                         readOnly
//                         value={value}
//                         className="form-control"
//                         name={name}
//                         id={name}
//                         type={type}
//                       />

//                       <ErrorMessage
//                         name={name}
//                         className="text-danger"
//                         component="div"
//                       />
//                     </div>
//                   ) : (
//                     <div className="">
//                       <FastField
//                         className="form-control"
//                         name={name}
//                         id={name}
//                         type={type}
//                       />
//                       <ErrorMessage
//                         name={name}
//                         className="text-danger"
//                         component="div"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </>
//         ) : (
//           <>
//             <div>
//               {required ? (
//                 <label className="form-label text-dark" style={style}>
//                   {label}
//                   <span className="text-danger ms-1">*</span>
//                 </label>
//               ) : (
//                 <label className="form-control">
//                   {label}
//                   <span className="text-muted">(optional)</span>
//                 </label>
//               )}
//               {readonly ? (
//                 <div className="mb-3">
//                   <FastField
//                     readOnly
//                     value={value}
//                     className="form-control"
//                     name={name}
//                     id={name}
//                     type={type}
//                   />

//                   <ErrorMessage
//                     name={name}
//                     className="text-danger"
//                     component="div"
//                   />
//                 </div>
//               ) : (
//                 <div className="mb-3">
//                   <FastField
//                     className="form-control"
//                     name={name}
//                     id={name}
//                     type={type}
//                   />
//                   <ErrorMessage
//                     name={name}
//                     className="text-danger"
//                     component="div"
//                   />
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </>
//     );
//   };
