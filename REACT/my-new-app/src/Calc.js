import React from 'react'

const Calc = (props) => {
    console.log(props);
    let z = props.x + props.y;
  return (
    <div>
      <h1>This is a props class</h1>
      <p>The year is {props.year}</p>
      <div>
        <p>
            The summation of {props.x} and {props.y} is {z}
        </p>
      </div>
    </div>
  )
}

export default Calc
