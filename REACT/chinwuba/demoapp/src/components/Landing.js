import React, { useState, useEffect, useRef } from 'react'

const Landing = () => {
    const [count, setCount] = useState(0)
    let imgSrc = 'https://via.placeholder.com/150'
    const img = useRef()
    useEffect(() => {
        if (count >= 5 && count < 10) {
            img.current.src = 'https://via.placeholder.com/300'
        }else if (count >= 10 && count < 15) {
            img.current.src = 'https://via.placeholder.com/450'
        }else{
            img.current.src = 'https://via.placeholder.com/150'
        }
    }, [count])
  return (
    <div>
        <h1 className='font-bold text-3xl text-center my-3'>Landing</h1>
        <div className="section">
            <h2 className='text-2xl font-bold'>Section 1</h2>
            <div className="img">
                <img src={imgSrc} ref={img} alt="placeholder" />
            </div>
            <p className='text-lg'>
                <button className='bg-slate-300 px-2 m-3' onClick={() => setCount(() => count - 1)}>-</button>
                {count}
                <button className='bg-slate-300 px-2 m-3' onClick={() => setCount(() => count + 1)}>+</button>
            </p>
        </div>
    </div>
  )
}

export default Landing