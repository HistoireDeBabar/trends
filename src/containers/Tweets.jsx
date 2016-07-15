import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tweet from '../components/Tweet.jsx';

export const mapStateToProps = (state = {}) => {
  const tweets = state.tweets || {};
  return {
    tweets,
  };
};

export const Tweets = ({ tweets }) => {
  if (!tweets || !tweets.statuses) {
    return <div></div>;
  }
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  const statuses = tweets.statuses;
  const tweetList = statuses.map((tweet) => <Tweet key={tweet.id} tweet={tweet}/>);
  return (
    <div style={ style }>
    { tweetList }
    </div>
  );
};

Tweets.propTypes = {
  tweets: PropTypes.object,
};

export default connect(mapStateToProps)(Tweets);
