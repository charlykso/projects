import React from "react";
import { useField } from 'formik'

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label>{label}</label>
      <select
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className='text-red-400'>{meta.error}</div>
      )}
    </>
  )
}

export default CustomSelect
