
# D3 Frontend Tests

## What is it?
E2E tests for [D3 frontend](https://github.com/d3ledger/back-office)

## Getting started
To start use this application you should run this commands in terminal.
``` bash
$ git clone https://github.com/d3ledger/back-office-test
$ cd back-office-test
$ yarn
```

**IMPORTANT** in our application we use `yarn` for dependency management if you do not have it, you should install it - [Installation | Yarn](https://yarnpkg.com/en/docs/install)

## Config 
Config file exists in `/cypress/config/config.json`.
- baseUrl - url of launched D3 frontend instance. 
- env - variables to configure tests

## Run

```
// run with GUI
yarn test
// run in terminal
yarn test:terminal
```

## Use several configs
If you want to use several configs, you can store them in `/cypress/config` folder and run with environment variable `CYPRESS_configFile` with the name of config file.
```
CYPRESS_configFile="dev" yarn test
```

## Run only one test in terminal
```
yarn test:terminal --spec "cypress/integration/auth.spec.js"
```