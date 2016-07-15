import logger from 'morgan';
import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from './src/routes';
import appBehaviour from './src/reducers';
import { init } from './src/data/tweetLoader.js';
import config from './config.js';
const app = express();
let twitterLoader;
// Set up (Authorize with Twitter API)
// the Tweet loader.
init(config).then((t) => {
 twitterLoader = t;
}).catch((e) => {
  // node error
  process.exit(1);
});

/** Returns a rendered string including your initial state
  / and initial render.
  */
function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Redux Universal Example</title>
        <link type="text/css" rel="stylesheet" href="styles/style.css" />
        <style>
        * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        }
        </style>
      </head>
      <body>
        <div id="root-app">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <script async type="application/javascript" src="dist/bundle.js"></script>
      </body>
    </html>`;
}

function renderApp(req, res, renderProps, data) {
  // Initialise our redux store with out reducers.
  const store = createStore(appBehaviour, data);
  // Initialise the componenet with the store
  // and rendered properties.
  const InitialComponent = (
    <Provider store={store} >
    <RouterContext {...renderProps} />
    </Provider>
  );
  const componentHTML = renderToString(InitialComponent);
  // Grab the initial state from our Redux store
  const initialState = store.getState();
  // Send the rendered page back to the client
  // including any initial state from redux.
  res.status(200).send(renderFullPage(componentHTML, initialState));
}

/**
 * Handles Request. Returns rednered page.
 * Triggered on every request.
 */
function handleRender(req, res) {
  // Matches the incoming request with a potential route in the react app.
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    }
    // If no route is found return a 404.
    if (!renderProps) {
      return res.status(404).end('Not found.');
    }
    twitterLoader.getTweets('%23PlaceAVote')
      .then((tweets) => {
        return renderApp(req, res, renderProps, { tweets });
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).end('Internal server error');
      });
  });
}

// Register static assets to serve from server.
app.use('/dist', express.static(`${__dirname}/dist`));
app.use('/styles', express.static(`${__dirname}/styles`));
// Register middleware.
app.use(logger('combined'));
app.use(handleRender);
export default app;
