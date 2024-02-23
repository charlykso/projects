import React from 'react';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            age: props.age
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                name: 'Chnwuba'
            })
        }, 3000);
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        document.getElementById('prevProps').innerHTML = `Previous Props: ${prevProps.name}`;
        document.getElementById('prevState').innerHTML = `Previous State: ${prevState.name}`;
    }
    addAge = () => {
        this.setState({
            age: this.state.age + 1
        })
    }
    subAge = () => {
        this.setState({
            age: this.state.age - 1
        })
    }
    changeName = () => {
        this.setState({
            name: 'Emmanuel'
        })
    }
    componentDidUpdate() {
        document.getElementById('prevState').innerHTML = `Current State: ${this.state.name}`;
    }
    render() {
        return (
          <div className='mb-3'>
            <h4>Users component</h4>
            <p>2 + 2 = {2 + 2}</p>
            <p>
              My name is {this.state.name} and I am {this.state.age} years old.
            </p>
            <button
              className='bg-green-600 text-white p-3 rounded-md uppercase mr-3'
              onClick={this.addAge}
            >
              add age
            </button>
            <button
              className='bg-green-600 text-white p-3 rounded-md uppercase'
              onClick={this.subAge}
            >
              sub age
            </button>
            <div>
              <button
                className='bg-green-600 text-white p-3 rounded-md uppercase mt-3'
                onClick={this.changeName}
              >
                Change name
              </button>
              <div>
                <p id='prevProps'></p>
                <p id='prevState'></p>
              </div>
            </div>
          </div>
        )
    }
}

export default Users;