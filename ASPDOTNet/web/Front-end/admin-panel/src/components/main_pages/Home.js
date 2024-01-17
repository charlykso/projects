import React from 'react'
import NewUsers from '../sub_pages/New_users'
import { useEffect, useState } from 'react'
import UsersCount from '../sub_pages/UsersCount'
import BooksCount from '../sub_pages/BooksCount'
import AdminsCount from '../sub_pages/AdminsCount'
import AuthoursCount from '../sub_pages/AuthoursCount'

function Home() {
  const [pageFinishedLoaging, setPageFinishedLoading] = useState(false)

  useEffect(() => {
    // This will run one time after the component mounts
    const onPageLoad = () => {
      setPageFinishedLoading(true)
    }

    // Check if the page has already loaded

    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad)
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad)
    }
  }, [])

  return (
    <div className=' w-full md:px-8 mb-5 mt-5'>
      <div className='flex flex-wrap justify-between gap-4  pt-5 pb-5 sm:flex-wrap'>
        <div className=' flex flex-col rounded-lg sm:w-full sm:flex-row  md:w-full w-full'>
          <div className='flex flex-col justify-between gap-10  w-full h-full p-6'>
            <div className='flex-1 flex justify-center bg-slate-100 rounded-lg items-center content-center py-3'>
              <UsersCount />
            </div>
            <div className='flex-1 flex justify-center bg-slate-100 rounded-lg  items-center content-center py-3'>
              <BooksCount />
            </div>
          </div>
          <div className='flex flex-col justify-between gap-10 rounded-tl-lg rounded-tr-lg w-full h-full p-6'>
            <div className='flex-1 flex justify-center bg-slate-100 rounded-lg items-center content-center py-3'>
              <AdminsCount />
            </div>
            <div className='flex-1 flex justify-center bg-slate-100 rounded-lg items-center content-center py-3'>
              <AuthoursCount />
            </div>
          </div>
        </div>
      </div>

      {pageFinishedLoaging && (
        <>
          <div className='flex flex-wrap justify-between gap-4  pt-5 pb-5 sm:flex-wrap'>
            <div className='flex-1 rounded-lg bg-slate-100 md:w-full sm:w-full xs:w-full'>
              {pageFinishedLoaging && <NewUsers />}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
