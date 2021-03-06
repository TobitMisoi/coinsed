
# Getting Started with Coinsed

### Application Overview
Disclaimer:
- Please read through this Documentation first.
- The web app is limited and restricted to certain scopes since most of the fetures and resources are just but test environment-specific.


[Coinsed](https://coinsed.vercel.app)

## Available Scripts

Before running your development app, consider;
 Adding your required environment variables for the frontend and backend directories:
   - `touch .env` from the /src folder
   
   ```
   REACT_APP_API_KEY: COINMARKETCAP_API_KEY
REACT_APP_CLIENT_ID: COINMARKET_CLIENT_ID
REACT_APP_REDIRECT_URL: COINMARKETCAP_REDIRECT_URL(http://localhost:3000/dashboard)

REACT_APP_AUTH0_DOMAIN: AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID: AUTH0_CLIENT_ID
REACT_APP_AUTH0_CLIENT_REDIRECT_URL: AUTH0_REDIRECT_URL(https://localhost:3000/dashboard)
   
   ```

In the project directory, you can run:

### `npm install`

if node version error persists try: `yarn install --ignore-engines`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For development: [http://localhost:3000](http://localhost:3000) is advised for API consumption.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Home page
Prerequisites:

[Allow Cors extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) - Simply activate the add-on and perform the request. CORS or Cross Origin Resource Sharing is blocked in modern browsers by default (in JavaScript APIs). By allowing CORS you will be able to view data from the API.

[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/e309TZ5Atcw)


## Dashboard 
Prerequisites

[Metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - to be able to connect Wallet and access the balances.

[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/W7DOAojj8N0)

### Coinsed APIs

 [https://coinmarketcap.com/api/](CoinMarketCap)
 The CoinMarketCap API is a suite of high-performance RESTful JSON endpoints that are specifically designed to meet the mission-critical demands of application developers, data scientists, and enterprise business platforms.
 This api allows for the data visualization in the app i.e charts
 
  [https://auth0.com/docs/api](Auth0)
  
  The Authentication API enables you to manage all aspects of user identity when you use Auth0. It offers endpoints so your users can log in, sign up, log out, access APIs, and more.
  
  ### Coinsed Technologies
  
  [MUI(material-ui)](https://mui.com/) - MUI provides a robust, customizable, and accessible library of foundational and advanced components, enabling you to build your own design system and develop React applications faster.
  
  [Metamask extension](https://thirdweb.com/) - This tool allows for the intergration of dApp in the Dashboard. It easily allows for the implementation of web3 features
  
 
 
