import express from 'express';
import { init } from './src/data/tweetLoader.js';
import config from './config.js';
let twitterLoader;
init(config).then((t) => {
  twitterLoader = t;
}).catch(() => {
  // node error
  process.exit(1);
});

const app = express();

function hashTagHandler(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  const query = req.query.t;
  twitterLoader.getTweets(`%23${query}`)
    .then((tweets) => {
      res.status(200).send(tweets);
    })
    .catch(() => {
      res.status(500).send({ error: 'Error' });
    });
}

app.use('/trends', hashTagHandler);
app.listen(5000);

