import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../src/containers/Home.jsx';
import Tweet from '../../src/containers/Tweets.jsx';
import Trends from '../../src/containers/Trends.jsx';

describe('Home:Containers', () => {
  it('Has Tweets Component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Tweet)).to.have.length(1);
    expect(wrapper.find(Trends)).to.have.length(1);
  });
});
