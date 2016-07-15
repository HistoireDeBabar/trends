import { expect } from 'chai';
import tweets, { init } from '../../src/data/tweetLoader.js';

describe('Tweets:Data', () => {
  describe('init', () => {
    it('initialises a tweet loader authenticating the application', (done) => {
      let calledOptions;
      const mockRequest = {
        post: (options, cb) => {
          calledOptions = options;
          cb(null, null, '{"access_token": "win"}');
        },
      };
      const options = {
        request: mockRequest,
        consumerKey: 'AAA',
        consumerSecret: 'BBB',
      };
      init(options)
        .then((AutherizedTweetLoader) => {
          expect(calledOptions.url).to.contain('api.twitter.com/oauth2/token');
          const key = new Buffer(`${options.consumerKey}:${options.consumerSecret}`).toString('base64');
          expect(calledOptions.headers.Authorization).to.contain(`Basic ${key}`);
          expect(AutherizedTweetLoader.getTweets).to.be.a('function');
          done();
        })
        .catch(done);
    });
    it('Throws error if request errors', (done) => {
      const mockRequest = {
        post: (options, cb) => {
          cb(new Error('Request Error'), null, null);
        },
      };
      const options = {
        request: mockRequest,
        consumerKey: 'AAA',
        consumerSecret: 'BBB',
      };
      init(options)
        .catch((e) => {
          expect(e.message).to.eql('Request Error');
          done();
        });
    });
    it('If theres errors in the returned body return them in the catch block', (done) => {
      const body = {
        errors: [
          {
            message: 'not authorized',
          },
        ],
      };
      const mockRequest = {
        post: (options, cb) => {
          const jsonBody = JSON.stringify(body);
          cb(null, null, jsonBody);
        },
      };
      const options = {
        request: mockRequest,
        consumerKey: 'AAA',
        consumerSecret: 'BBB',
      };
      init(options)
        .catch((e) => {
          expect(e).to.eql(body);
          done();
        });
    });
  });
  describe('Query', () => {
    it('Queries Twitter Api for a given hashtag', (done) => {
      let calledParams;
      const expected = {
        statuses: [
          {
            text: 'Im a tweet'
          },
        ],
      };
      const mockRequest = (params, cb) => {
        calledParams = params;
        cb(null, null, JSON.stringify(expected));
      };
      const options = {
        request: mockRequest,
        token: 'BBB',
      };
      const tweetLoader = tweets(options);
      tweetLoader.getTweets('%23PlaceAVote')
        .then((response) => {
          expect(calledParams.url).to.contain('https://api.twitter.com/1.1/search/tweets.json?q=%23PlaceAVote');
          expect(calledParams.headers.Authorization).to.contain('Bearer BBB');
          expect(response).to.eql(expected);
          done();
        })
        .catch(done);
    });
    it('Returns error body in catch if theres an error from twitter', (done) => {
      const expected = {
        errors: [
          {
            message: 'Something went wrong'
          },
        ],
      };
      const mockRequest = (params, cb) => {
        cb(null, null, JSON.stringify(expected));
      };
      const options = {
        request: mockRequest,
        token: 'BBB',
      };
      const tweetLoader = tweets(options);
      tweetLoader.getTweets('%23PlaceAVote')
        .catch((e) => {
          expect(e).to.eql(expected);
          done();
        });
    });
    it('Receives an error from the request function', (done) => {
      const mockRequest = (params, cb) => {
        cb(new Error('Request Error'), null, null);
      };
      const options = {
        request: mockRequest,
        token: 'BBB',
      };
      const tweetLoader = tweets(options);
      tweetLoader.getTweets('%23PlaceAVote')
        .catch((e) => {
          expect(e.message).to.eql('Request Error');
          done();
        }).catch(done);
    });
  });
});
