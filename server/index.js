// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8080/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3006';
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:8080/callback';
  FRONTEND_URI = 'http://localhost:3006';
}

import express, { static as expressStatic } from 'express';
import Axios from 'axios';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { resolve } from 'path';
import cluster from 'cluster';
import os from 'os';
import history from 'connect-history-api-fallback';
import { URLSearchParams, fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { isMater, fork } = cluster;
const numCPUs = os.cpus().length;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

// Multi-process to utilize all CPU cores.
if (isMater) {
  console.warn(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(expressStatic(resolve(__dirname, '../client/build')));

  app
    .use(expressStatic(resolve(__dirname, '../client/build')))
    .use(cors())
    .use(cookieParser())
    .use(
      history({
        verbose: true,
        rewrites: [
          { from: /\/login/, to: '/login' },
          { from: /\/callback/, to: '/callback' },
          { from: /\/refresh_token/, to: '/refresh_token' },
        ],
      })
    )
    .use(expressStatic(resolve(__dirname, '../client/build')));

  app.get('/', function (req, res) {
    res.render(resolve(__dirname, '../client/build/index.html'));
  });

  app.get('/login', function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope =
      'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
    res.redirect(
      `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      }).toString()}`
    );
  });

  app.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        `/#${new URLSearchParams({ error: 'state_mismatch' }).toString()}`
      );
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization: `Basic ${new Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString('base64')}`,
        },
        json: true,
      };
      Axios(authOptions)
        .then((response) => {
          if (response.status === 200) {
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            // we can also pass the token to the browser to make requests from there
            res.redirect(
              `${FRONTEND_URI}/#${new URLSearchParams({
                access_token,
                refresh_token,
              }).toString()}`
            );
          } else {
            throw new Error('');
          }
        })
        .catch((error) => {
          console.log(error);
          res.redirect(
            `/#${new URLSearchParams({ error: 'invalid_token' }).toString()}`
          );
        });
    }
  });

  app.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      params: {
        grant_type: 'refresh_token',
        refresh_token,
      },
      json: true,
    };

    Axios(authOptions)
      .then((response) => {
        if (response.status === 200) {
          const access_token = response.data.access_token;
          res.send({ access_token });
        } else {
          throw new Error('');
        }
      })
      .catch((error) => {
        console.log(error.response);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(resolve(__dirname, '../client/public', 'index.html'));
  });

  app.listen(PORT, function () {
    console.warn(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
