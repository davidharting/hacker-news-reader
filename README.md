# Hacker New Reader

A simple hacker news reader with infinite scroll and offline support.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template._

## Deployment

🌍 https://david-harting-hn-reader.netlify.app/

The site is hosted on Netlify, which also provides pull request previews.
Circle CI provides continuous integration, running linter, typechecking, and jest tests.

## Setup and scripts

### Run the project locally

```bash
git clone https://github.com/davidharting/hacker-news-reader.git
cd hacker-news-reader
yarn && yarn start
```

#### Run tests

```bash
yarn test # watch mode
yarn test:ci # run tests serially and exit
```

### Lint

```bash
yarn lint
```

### Type check

```bash
yarn tsc
```

### Create a production build

```
yarn build
```
