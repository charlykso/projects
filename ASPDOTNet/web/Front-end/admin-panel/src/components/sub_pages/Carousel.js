import React from 'react'
import banner from '../../images/bg-img.jpg'

const Carousel = () => {
  return (
    <div className='relative w-full  flex justify-center md:w-[80%]'>
      <img src={banner} className='block h-auto max-w-full md:max-w-[40rem]' alt='...' />
    </div>
  )
}

export default Carousel
