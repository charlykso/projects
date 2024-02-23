import './App.css';
import About from './components/About';
import Nav from './components/Nav';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Comp from './components/Comp';
import Landing from './components/Landing';

function App() {
  
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About title='About' description='This is about age' />} />
        <Route path='/contact' element={<Contact />} />
        
        <Route path='/auth' element={<Comp />} >
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
