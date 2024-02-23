import React, { useState } from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'


const Nav = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleShow = () => {
    setShowMenu(!showMenu)
  }
    return (
      <div>
        <header className='App-header flex justify-between items-center'>
          <div className='logo'>
            <img src={logo} className='App-logo' alt='logo' />
          </div>
          <div className='nav hidden xsm:block  '>
            <ul className='flex justify-between items-center gap-3 pr-3'>
              <li>
                <Link to='/' className='text-white font-bold'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-white font-bold'>
                  About
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-white font-bold'>
                  Contact
                </Link>
              </li>
              <li>
                <Link to='/auth/signup' className='text-white font-bold'>
                  Signup
                </Link>
              </li>
              <li>
                <Link to='/auth/signin' className='text-white font-bold'>
                  Signin
                </Link>
              </li>
            </ul>
          </div>
          <div className='menu block xsm:hidden'>
            {showMenu ? (
              <button onClick={handleShow}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  fill='white'
                  className='bi bi-x'
                  viewBox='0 0 16 16'
                >
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                </svg>
              </button>
            ) : (
              <button onClick={handleShow}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  fill='white'
                  className='bi bi-list'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
                  />
                </svg>
              </button>
            )}
          </div>
        </header>
        {showMenu && (
          <div className='smallMenu bg-black '>
            <ul className=''>
              <li className='w-full'>
                <Link
                  to='/'
                  className='text-white font-bold block hover:text-black hover:bg-white'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='text-white font-bold block hover:text-black hover:bg-white'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='text-white font-bold block hover:text-black hover:bg-white'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to='/auth/signup'
                  className='text-white font-bold block hover:text-black hover:bg-white'
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  to='/auth/signin'
                  className='text-white font-bold block hover:text-black hover:bg-white'
                >
                  Signin
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }


export default Nav
