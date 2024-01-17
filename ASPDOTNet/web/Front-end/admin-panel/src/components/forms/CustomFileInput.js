import { useField } from 'formik'

const CustomFileInput = ({ label }) => {
  const [field, meta] = useField({
    name: 'AuthorPic',
    type: 'file',
  })
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <input
        type='file'
        id={field.name}
        {...field}
        
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

export default CustomFileInput
