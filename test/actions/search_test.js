import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchTweets from '../../src/actions/search.js';
import nock from 'nock';
import { expect } from 'chai';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  const loadedTweets = [];

  it('creates actions when tweets and have been loaded', (done) => {
    const response = { statuses: loadedTweets };
    nock('http://localhost:5000')
      .get('/trends?t=CatMemes')
      .reply(200, JSON.stringify(response));

    const expectedActions = [
      { type: 'FETCHING_TWEETS', trend: 'CatMemes' },
      { type: 'TWEETS_LOADED', tweets: response, trend: 'CatMemes' },
    ];
    const store = mockStore({ tweets: {} });

    return store.dispatch(fetchTweets('CatMemes'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch(done);
  });

  it('creates an error action when the request fails', (done) => {
    nock('http://localhost:5000')
      .get('/trends?t=CatMemes')
      .replyWithError('Error');

    const expectedActions = [
      { type: 'FETCHING_TWEETS', trend: 'CatMemes' },
      { type: 'FETCHING_TWEETS_ERROR' },
    ];
    const store = mockStore({ tweets: {} });

    return store.dispatch(fetchTweets('CatMemes'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch(done);
  });
});
