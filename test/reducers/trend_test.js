import { expect } from 'chai';
import trends from '../../src/reducers/trend.js';

describe('Trends:Reducers', () => {
  it('should not return undefined', () => {
    const subject = trends();
    expect(subject).to.eql('#PlaceAVote');
  });
  it('by default has no tweets on global state', () => {
    const state = '#CatMemes';
    const subject = trends(state);
    expect(subject).to.eql('#CatMemes');
  });
  it('changes the trend when a tweet loaded action occurs', () => {
    const state = '#CatMemes';
    const subject = trends(state, { type: 'TWEETS_LOADED', trend: 'E3Memes' });
    expect(subject).to.eql('E3Memes');
  });
});
