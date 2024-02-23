import React from 'react'
import { Outlet } from 'react-router-dom'

const Comp = () => {
  return (
    <div>
        {/* <h1>Comp</h1> */}
        <Outlet />
    </div>
  )
}

export default Comp
