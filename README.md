# QR Assistance Service Register

A highly scalable and simple boilerplate for server apps.

## Quick start

Rename `.env.example` to `.env`. Then:

```sh
# install dependencies
$ yarn

# reload on each change
$ yarn build:watch
# or
$ yarn dev

# reload on each change and inspect
# https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js
$ yarn dev:inspect

# build for production
$ yarn build

# run lint
$ yarn lint

# run lint and watch
$ yarn lint:watch

# run tests
$ yarn test

# run tests and watch
$ yarn test:watch

# run test coverage report
$ yarn test:coverage

# start production server
$ yarn start
```

## Documentation

### Boilerplate structure

```
.
├── .babelrc                  # babel config
├── .editorconfig             # editor config
├── .eslintignore             # eslint ignore config
├── .eslintrc                 # eslint config
├── .gitignore                # git ignore config
├── .nvmrc                    # nvm config
├── .jest.config.json         # jest config
├── package.json              # https://docs.npmjs.com/files/package.json
├── README.md                 # this file
├── yarn.lock                 # https://yarnpkg.com/en/docs/yarn-lock
├── coverage/                 # jest coverage output
├── dist/                     # babel build output
├── lib/                      # future external packages
├── public/                   # static public files
└── src/                      # source code
    └── main.js               # app entry file
```

### Update node alias

You have to update three files:

* `.babelrc`
* `.eslintrc.js`
* `jest.config.json`

### Change entry file

Update scripts from `package.json`
