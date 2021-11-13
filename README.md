# Wish-list approval web application created by Mingyum Kim

## Introduction

A web application for approving children's wish lists for Christmas presents. You, as a parent, can check and interact with your children's wish lists and make approvals as you wish.

## Technologies

- React
- Typescript
- SCSS
- fakestoreapi.com

## How to use?

The application is very simple. Add and remove products in the wish lists and then make the final approval. Try it here: https://hardcore-swirles-81325b.netlify.app/

## How does it work?

This application uses data from fakestoreapi.com. This application creates an internal state, which is manipulated according to the user's input. When the user makes the final decision, both selected and discarded items will be pushed to the api, however **the actual data is not saved in the fakestoreapi.com database.**

## If I had more time I whould change...

- more lively UI design (e.g. animation effects)
- better test coverage
- comprehensive error handling

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
