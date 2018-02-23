import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { Link } from 'react-router-dom'

@provideHooks({
  fetch: locals => console.log('triggered!', locals)
})
class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/about">About</Link>
      </div>
    )
  }
}

export default Home
