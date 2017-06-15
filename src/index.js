import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import rootReducer from './reducers/index'
import PostsIndex from './components/PostsIndex'
import PostNew from './components/PostNew'
import PostShow from './components/PostShow'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route path='/posts/new' component={PostNew} />
          <Route path='/posts/:id' component={PostShow} />
          <Route path='/' component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
