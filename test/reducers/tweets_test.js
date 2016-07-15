import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import tweets from '../../src/reducers/tweets.js';

describe('Tweets:Reducers', () => {
  it('should not return undefined', () => {
    const subject = tweets();
    expect(subject).to.eql({});
  });
  it('should not mutate the original state', () => {
    const state = {};
    deepFreeze(state);
    const subject = tweets(state);
    expect(subject).to.eql({});
  });
  it('by default has no tweets on global state', () => {
    const state = {};
    const subject = tweets(state);
    expect(subject.tweets).to.eql(undefined);
  });
  it('returns a new state with new tweets', () => {
    const initState = {
      statuses: [],
    };
    deepFreeze(initState);
    const actionedState = {
      statuses: [{
        id: 0,
        text: 'hello',
      }],
    };
    const subject = tweets(initState, { type: 'TWEETS_LOADED', tweets: actionedState });
    expect(subject.statuses).to.have.length(1);
    expect(subject.statuses[0].id).to.eql(0);
    expect(subject.statuses[0].text).to.eql('hello');
  });
});
