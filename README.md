# Welcome to BookRack

![bookrack](/public/images/bookrack.png)

An interactive web app to track the books that you read and own. Find any title using the Google Books API integrated with the app and add them to your personal library,
Keep track of the books status by marking it complete or own so that you always know which books you have read. BookRack is built using React, Context API, SASS, Node/Express, Mongodb Atlas and Google Books API.

## [Demo Video on YouTube](https://youtu.be/e2J5Ckc1Ooc)

## [Deployed on Heroku and Netlify](https://bookrack-sudokun.netlify.app/)

The backend for this app is hosted on a free Heroku server. Please allow 30-45 seconds for the content to load when you open the app.

## Tech-stack

Below is a non-exhaustive list of technologies used throughout the project
| Front end | Back end | Libraries | APIs |  
|-------------|----------|-----------------|--------------|
| React | Node.js | Framer-motion | Google Books |  
| Context API | Express | React-hook-form | |  
| SASS | Mongodb | | |

## Setup

If you want to play around with BookRack, feel free to clone the repo. To start, please enter the following commands in your terminal:

```
git clone https://github.com/ManeeshBusi/bookrack-client.git
cd bookrack-client-master
yarn install
yarn run dev
```

You'll also need to create an account in firebase for image storage and set it to process environment variables:

```
process.env.REACT_APP_FB_BUCKET
process.env.REACT_APP_FB_KEY
process.env.REACT_APP_FB_AUTH
process.env.REACT_APP_FB_ID
process.env.REACT_APP_FB_STORE
process.env.REACT_APP_FB_SEND
process.env.REACT_APP_FB_APP
process.env.REACT_APP_API_URL = "http://localhost:5000/api"
```

P.S: Make sure to change process.env.REACT_APP_API_URL according to your PORT number of the API or deployed API URL

This is for the frontend. To get the backend please go to this [link](https://github.com/ManeeshBusi/bookrack-api) and follow the steps given there.
