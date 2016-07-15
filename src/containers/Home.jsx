// Define any application specific (inc. behavioural) containers
// for example, a container for pages or elements that inject data
// and behavour into the visual aspects you define in a component.
import React from 'react';
import Tweet from './Tweets.jsx';
import Trends from './Trends.jsx';

const Home = () => {
  const style = {
    backgroundColor: '#F8F8F8',
  };
  return (
    <div style={ style }>
    <Trends />
    <Tweet />
    </div>
  );
};

export default Home;
