import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { Link } from 'react-router-dom'
import styles from './styles.scss'

// @provideHooks({
//   fetch: locals => console.log('Home triggered!'),
//   defer: locals => console.log('Home Defer triggered!')
// })
class Home extends Component {
  render () {
    return (
      <div className={styles.container}>
        <h1>Home</h1>
        <Link to="/about">About</Link>
      </div>
    )
  }
}

export default Home
