import {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [fetchErr, setFetchErr] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const abortCont = new AbortController()
        setIsLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource')
            }
            if (res.status === 400) {
                throw Error('Bad request')
            }
            if (res.status === 401) {
                throw Error('Unauthorized')
            }
            return res.json()
        })
        .then((data) => {
            setData(data)
            setIsLoading(false)
            setFetchErr(null)
        })
        .catch((err) => {
            setIsLoading(false)
            setFetchErr(err.message)
        })
        return () => abortCont.abort()
    }, [url])

    
  return { data, fetchErr, isLoading}
}

export default useFetch