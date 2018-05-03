## Development Setup

### Install Dependencies
Run `$ npm install`
Run `$ npm install -g firebase-tools`

### How to write functions
Add cloud functions in `index.ts`

### Test Locally
1. First, run `$ npm run build` to transpile to javascript
2. Optional: `$ firebase functions:config:get > .runtimeconfig.json` to retrieve runtime configs
3. To test functions locally: `firebase serve --only functions`

### Deploy to Firebase
To deploy to firebase: `firebase deply --only functions`

