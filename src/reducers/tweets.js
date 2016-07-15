import * as actions from '../actions/constants.js';
const tweets = (state = {}, action = {}) => {
  switch (action.type) {
    case actions.TWEETS_LOADED: {
      return action.tweets;
    }
    default:
      return state;
  }
};

export default tweets;
