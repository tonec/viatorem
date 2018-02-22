import React, { Component } from 'react';
import { provideHooks } from 'redial'

@provideHooks({
  fetch: (locals) => console.log('triggered!', locals)
})
class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default Home
