import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import session from './reducers/session';
import content from './reducers/content';
import auth from './reducers/auth';
import logger from 'redux-logger'

export default createStore(
  combineReducers({ content, session, auth }),
  applyMiddleware(thunk, logger)
);