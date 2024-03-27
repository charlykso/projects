import { useState } from 'react'

const useCreateUser = () => {
  const [createUserError, setCreateUserError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState(null)

  const createUser = async (formData, url) => {
    setIsLoading(true)
    setCreateUserError(null)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    try {
      const data = await response.text()
      const resText = JSON.parse(data)
      if (!response.ok) {
        throw Error(resText.error)
      } else {
        // console.log(resText)
        setResData(resText)
        setIsLoading(false)
      }
    } catch (error) {
      setCreateUserError(error.message)
      setIsLoading(false)
    }
  }

  return { createUser, createUserError, setCreateUserError, isLoading, resData }
}

export default useCreateUser
