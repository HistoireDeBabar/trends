// Define visual components to use within your React application.
import React, { PropTypes } from 'react';
const Tweet = ({ tweet }) => {
  if (!tweet) {
    return (<div></div>);
  }
  const user = tweet.user || {
    screen_name: 'UnknownUser',
  };
  return (
    <div className='tweet'>
    <h6 className='tweet__username'>
      { user.screen_name }
    </h6>
    <p className='tweet__text'>
    { tweet.text }
    </p>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object,
};

export default Tweet;
