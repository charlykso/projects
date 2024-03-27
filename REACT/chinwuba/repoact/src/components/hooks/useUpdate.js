import { useState } from 'react'

export const useUpdate = () => {
  const [updateErr, setUpdateErr] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [updateIsLoading, setUpdateIsLoading] = useState(false)

  const updateProfile = async (formData, url) => {
    setUpdateIsLoading(true)
    try {
      const res = await fetch(url, {
        method: 'PUT',
        body: formData,
      })
      const resData = await res.text()
      const resText = JSON.parse(resData)
      if (!res.ok) {
        throw Error(resData.error)
      } else {
        setUpdateSuccess(resText)
        setUpdateIsLoading(false)
      }
    } catch (error) {
      // console.log(error.message)
      setUpdateErr(error.message)
      setUpdateIsLoading(false)
    }
  }
  return { updateProfile, updateErr, updateSuccess, updateIsLoading }
}
