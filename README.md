# Hacker New Reader

A simple hacker news reader with infinite scroll and offline support.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template._

## Deployment

🌍 https://david-harting-hn-reader.netlify.app/

The site is hosted on Netlify, which also provides pull request previews.
Circle CI provides continuous integration, running linter, typechecking, and jest tests.

## Setup and scripts

### Run the project locally

I built this project using Node.js 12.16.3, but it should work with Node.js 10+.

```bash
git clone https://github.com/davidharting/hacker-news-reader.git
cd hacker-news-reader
npm install && npm start
```

### Run tests

```bash
npm test # watch mode
npm run test:ci # run tests serially and exit
```

### Lint

```bash
npm run lint
```

### Type check

```bash
npm run tsc
```

### Create a production build

```
npm run build
```
