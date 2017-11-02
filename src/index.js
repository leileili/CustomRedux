import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReducerManager from './common/ReducerManager'
import cm from './common/CommunicationManager'
import { Router, Route, IndexRoute, useRouterHistory, browserHistory  } from 'react-router'
import { createHashHistory } from 'history'
import About from './components/About'
import Home from './components/Home'
import App from './components/App'
import {getActionMiddleware} from './common/getActionMiddleware'


let store = createStore(ReducerManager, applyMiddleware(getActionMiddleware));
cm.init(store);

render(
  <Provider store={store}>
	  <Router history={browserHistory }>	  	
		<Route path='/' component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
  </Provider>,
  document.getElementById('root')
)







