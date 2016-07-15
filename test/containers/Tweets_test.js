import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Tweets, mapStateToProps } from '../../src/containers/Tweets.jsx';
import Tweet from '../../src/components/Tweet.jsx';

describe('Tweets:Containers', () => {
  const tweets = {
    statuses: [
      {
        id: 0,
        user: {
          screen_name: '@Test',
        },
        text: 'Hello,',
      },
      {
        id: 1,
        user: {
          screen_name: '@User',
        },
        text: 'World!',
      },
    ],
  };
  describe('Tweet', () => {
    it('returns an element with a list of tweet elements', () => {
      const wrapper = shallow(<Tweets tweets={ tweets }/>);
      expect(wrapper.find(Tweet)).to.have.length(2);
    });
    it('returns an element with no tweets given no data', () => {
      const wrapper = shallow(<Tweets />);
      expect(wrapper.html()).to.eql('<div></div>');
    });
    it('returns an element with no tweets given no statuses', () => {
      const t = {};
      const wrapper = shallow(<Tweets tweets={ t } />);
      expect(wrapper.html()).to.eql('<div></div>');
    });
  });
  describe('mapStateToProps', () => {
    it('returns an empty object if given undefined', () => {
      const subject = mapStateToProps();
      expect(subject.tweets).to.eql({});
    });
    it('returns an empty object if given state with no tweets', () => {
      const subject = mapStateToProps({});
      expect(subject.tweets).to.eql({});
    });
    it('returns the states tweets property if defined', () => {
      const subject = mapStateToProps({ tweets });
      expect(subject.tweets).to.eql(tweets);
    });
  });
});
