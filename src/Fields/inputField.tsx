import {Field,ErrorMessage} from 'formik'

type inputProps= {
    name: string, 
    label:string
}


export const Input=({name, label} : inputProps)=>{
    return(
        <div className='mb-3'>
        <label className='mb-2 form-control-label'>{label} </label>
        <Field name={name} className=" form-control" />
        <ErrorMessage name={name} component= "div"/>
        </div>
    )
}