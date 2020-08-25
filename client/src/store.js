import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import learning from './reducers/learning';
import content from './reducers/content';
import logger from 'redux-logger'

export default createStore(
  combineReducers({ content }),
  applyMiddleware(thunk, logger)
);