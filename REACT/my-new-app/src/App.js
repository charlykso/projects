import './App.css';
import About from './About'
import Contact from './Contact'
import Calc from "./Calc";

function App() {
  let x = 5;
  let y = 2;
  let z = x + y;
  let name = "Emmanuel";
  let age = 13;
  let address = "Water works road";


  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello!, World {z}</h1>
        <p>
          Welcome, {name} <br />
          You are {age} years old <br />
          Your address is {address}
        </p>
        <About />
        <Contact />
        <Calc year='2023' x={5} y={2} />
      </header>
    </div>
  );
}

export default App;
