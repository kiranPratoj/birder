import React, { Component, Fragment } from 'react'
import Footer from './components/Layouts/Footer'
import HomePageSearchUi from './containers/HomePageSearch/HomePageSearchUi'

class Home extends Component {

  render() {
    return (
      <Fragment>
        <HomePageSearchUi />
        <Footer />
      </Fragment>
    )
  }
}

export default Home
