import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { Link } from 'react-router-dom'

// @provideHooks({
//   fetch: locals => console.log('About triggered!'),
//   defer: locals => console.log('Defer triggered!')
// })
class About extends Component {
  render () {
    return (
      <div>
        <h1>About</h1>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default About
