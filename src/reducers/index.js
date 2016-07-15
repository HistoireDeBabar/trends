import { combineReducers } from 'redux';
// Define or import reducer functions to manage your redux application.
import tweets from './tweets.js';
import trend from './trend.js';

const rootReducer = combineReducers({
  tweets,
  trend,
});

export default rootReducer;
