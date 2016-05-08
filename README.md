# twitter_feed

## Synopsis

A Single Page Application that uses Twitter's streaming and REST APIs to retrieve the latest tweets concerning Donald Trump and Hillary Clinton.

## Technologies

The primary technologies and ideas used in this demo are

- React
- Redux
- Express
- Twitter module from desmondmorris
- Universal JavaScript for server side rendering

## Requirements

- npm (developed on v2.14.7, tested on v3.8.9)
- node v4.2.3
- gulp installed globally (sudo npm install -g gulp)

## Configuration

- Twitter API keys are located in config/default.js
- server hostname and port configuration are located in config/default.js (see known issues below)

## Installation

After pulling the repo and matching the above requirements execute the following steps to install.

- npm install
- gulp
- npm run development

Then - open a browser to http://localhost:5010 to run the site.  To see an example of the server side rendering, open directly to http://localhost:50105/list/trump

## Production

Running 'npm run development' will run the app through a dev server. It is not recommended to run babel-node in production. To build for production do

- gulp
- npm run build
- npm run start

## Tests

Light test coverage has been included as an example.  To run the tests covering the React actions do

- npm run client-test
- npm run client-coverage
