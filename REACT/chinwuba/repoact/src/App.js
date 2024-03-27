import './App.css'
import Sidebar from './components/nav/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Repo from './components/pages/Repo'
import ListCommit from './components/pages/ListCommit'
import Signup from './components/auth/Signup'
import Signin from './components/auth/Signin'
import Profile from './components/pages/Profile'
// import Logout from './components/auth/Logout'
import { useAuthContext } from './components/hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  return (
    <>
      <div className='h-[150vh] w-full min'>
        <Routes>
          <Route path='/' element={<Sidebar />}>
            <Route path='/' element={<Home />} />
            <Route path='/repo' element={user ? <Repo /> : <Home />} />
            <Route path='/repo/charlykso/:name' element={<ListCommit />} />
            <Route path='/profile' element={user ? <Profile /> : <Home />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          {/* <Route path='/signout' element={<Logout />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
