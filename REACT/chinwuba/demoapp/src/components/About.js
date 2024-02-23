import React, { Component } from 'react'

export class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.description,
      data: [],
    }
    const getData = async () => {
      const res = await fetch('https://api.github.com/users/charlykso/repos', {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
      this.setState({ data: data })
    }
    getData()
  }
  render() {
    return (
      <div className='p-3 my-3'>
        <h4 className='text-2xl'>{this.state.description}</h4>
        {this.state.data && (
          <table className='border '>
            <thead>
              <tr className='border '>
                <th>S/N</th>
                <th className='border '>Repo Id</th>
                <th className='border '>Repo</th>
                <th className='border '>URL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((repo, index) => (
                <tr key={repo.id} className='border'>
                  <td className='border'>{index + 1}</td>
                  <td className='border'>{repo.id}</td>
                  <td className='border'>{repo.name}</td>
                  <td className='border'>
                    <a href={repo.html_url} target='_blank' rel='noreferrer'>
                      {repo.html_url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default About
