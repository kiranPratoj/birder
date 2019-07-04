import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import { setUser } from './actions/user'
// import { setPosts } from './actions/posts'


// import { userInfo } from 'os';

const store = configureStore()

store.subscribe(() => {
  console.log('redux store state', store.getState())
})


// user reloaded page
if (localStorage.getItem('userAuthToken')) {
  axios.get('https://birder-app.herokuapp.com/users/account', {
    headers: {
      'x-auth': localStorage.getItem('userAuthToken')
    }
  })
    .then(response => {
      store.dispatch(setUser(response.data))
    })

  //   axios.get('http://dct-user-auth.herokuapp.com/posts', {
  //     headers: {
  //       'x-auth': localStorage.getItem('userAuthToken')
  //     }
  //   })
  //     .then(response => {
  //       const posts = response.data
  //       store.dispatch(setPosts(posts))
  //     })
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root')) 