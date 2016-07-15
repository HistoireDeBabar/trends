import fetch from 'isomorphic-fetch';
import * as actions from './constants.js';

const loaded = (response, trend) => {
  return {
    type: actions.TWEETS_LOADED,
    tweets: response,
    trend,
  };
};

const fetching = (trend) => {
  return {
    type: actions.FETCHING_TWEETS,
    trend,
  };
};

const error = () => {
  return {
    type: actions.FETCHING_TWEETS_ERROR,
  };
};

const fetchTweets = (trend) => {
  return dispatch => {
    dispatch(fetching(trend));
    return fetch(`http://localhost:5000/trends?t=${trend}`)
      .then(res => res.json())
      .then(json => dispatch(loaded(json, trend)))
      .catch((e) => { dispatch(error(e)); });
  };
};

export default fetchTweets;
