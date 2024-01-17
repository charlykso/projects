import React from 'react'
import { useField } from 'formik'

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className='text-red-400'>{meta.error}</div>
      )}
      {!meta.error && props.image_name && (
        <p className='text-green-500'>
          {props.image_name}
        </p>
      )}
    </>
  )
}

export default CustomInput
