import * as actions from '../actions/constants.js';
const trend = (state = '#PlaceAVote', action = {}) => {
  switch (action.type) {
    case actions.TWEETS_LOADED: {
      return action.trend;
    }
    default:
      return state;
  }
};

export default trend;
