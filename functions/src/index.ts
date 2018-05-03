import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request';

/**
 * Use TypeScript to write Firebase cloud functions.
 * 
 * Storing configurations, tuneable settings, third-party API keys:
 *    You can set environment configurations such as API secret keys using
 *    Firebase's Environment Configuration: https://firebase.google.com/docs/functions/config-env
 */

admin.initializeApp();

/**
 * API Endpoints
 */
const SPOTIFY_AUTH_ENDPOINT: string = 'https://accounts.spotify.com/api/token';

/**
 * This endpoint retrieves an access token for the client app to communicate with Spotify's Web API
 * This does not grant the app any access to modify Spotify user's settings
 */
export const retrieveSpotifyAccessToken = functions.https.onRequest((req, res) => {
  const secret: string = functions.config().spotify.secret;
  const clientId: string = functions.config().spotify.id;
  const auth: string = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const options: request.CoreOptions = {
    headers: {
      'Authorization': `Basic ${auth}`,
    },
    form: {
      grant_type: 'client_credentials',
    },
  }
  request.post(SPOTIFY_AUTH_ENDPOINT, options, (err, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.type('application/json');
      res.send(body);
    } else {
      res.status(500).send({error: 'Something went wrong'});
      console.error('ERR: RETRIEVE_SPOTIFY_ACCESS_TOKEN');
      console.error(err);
    }
  });
});

