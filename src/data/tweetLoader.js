const TWITTER_API = 'https://api.twitter.com/';
const SEARCH_TWEETS = '1.1/search/tweets.json';
const QUERY = '?q=';
const OAUTH = 'oauth2/';
const TOKEN = 'token';

/**
 * generates a request for a search.
 */
const generateSearchRequest = (options = {}, search = '') => {
  return {
    url: `${TWITTER_API}${SEARCH_TWEETS}${QUERY}${search}`,
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
  };
};

/**
 * Given a search parameter query the twitter api.
 * Options must include an acces token.
 * Wont encode search pass in uri encoded search.
 */
const getTweets = (options = {}, search = '') => {
  return new Promise((success, error) => {
    const request = generateSearchRequest(options, search);
    options.request(request, (err, response, body) => {
      if (err) {
        return error(err);
      }
      const message = JSON.parse(body);
      if (message.errors && message.errors.length > 0) {
        return error(message);
      }
      return success(message);
    });
  });
};

/**
 * Tweet Loader Interface
 * Allows searching for tweets.
 */
const tweetLoader = (options = {}) => {
  return {
    getTweets: (search = '') => {
      return getTweets(options, search);
    },
  };
};

/**
 * Helper method to generate a request to authenticate
 * the application with twitter.
 */
const generateAuthRequest = (options = {}) => {
  const url = `${TWITTER_API}${OAUTH}${TOKEN}`;
  const key = new Buffer(`${options.consumerKey}:${options.consumerSecret}`).toString('base64');
  const headers = {
    Authorization: `Basic ${key}`,
    ContentType: 'application/x-www-form-urlencoded;charset=UTF-8.',
  };
  return {
    url,
    headers,
    formData: {
      grant_type: 'client_credentials',
    },
  };
};

/**
 * Initialises an authenticated tweet loader given a consumer key
 * and secret key.
 */
export const init = (options = {}) => {
  return new Promise((success, error) => {
    const request = generateAuthRequest(options);
    options.request.post(request, (err, response, body) => {
      // Returns error from request
      if (err) {
        return error(err);
      }
      const message = JSON.parse(body);
      // Returns Twitter Specific Errors (i.e. not authorized)
      if (message.errors && message.errors.length > 0) {
        return error(message);
      }
      options.token = message.access_token;
      // Returns a tweetLoader with a valid token
      return success(tweetLoader(options));
    });
  });
};

export default tweetLoader;
