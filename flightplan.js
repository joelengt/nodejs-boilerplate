require('dotenv').config()

var plan = require('flightplan')

var app = process.env.NAME_APPLICATION
var username = process.env.USER_DEPLOYMENT
var enviroment = process.env.NODE_ENV

// folder to store
var folder = app + '-' + new Date().getTime()

// enviroments
plan.target('production', [
  {
    host: process.env.HOST_PRODUCTION,
    username: username,
    privateKey: process.env.PRIVATE_KEY_PATH,
    agent: process.env.SSH_AUTH_SOCK,
    passphrase: process.env.PRIVATE_KEY_PASSPHRASE
  }
])

// run commands on localhost
plan.local(function (local) {
  local.log('Copy files to remote hosts')
  var filesToCopy = local.exec('git ls-files', {silent: true})
  local.transfer(filesToCopy, '/tmp/' + folder)
})

// run commands on the target's remote hosts
plan.remote(function (remote) {
  let user = remote.runtime.username

  remote.log('Remove last directory')
  remote.rm(`-rf ${app}`)

  remote.log('Move folder to root')

  remote.sudo(`cp -R /tmp/${folder} ~`, {user})
  remote.rm(`-rf /tmp/${folder}`)

  remote.log('Create symlink app')
  remote.sudo(`ln -snf ~/${folder} ~/${app}`, {user})

  remote.log('Install dependencies')
  remote.sudo(`cd ~/${app} && npm i`, {user})

  remote.log('Create folder dist')
  remote.sudo(`cd ~/${app} && npm run dist`, user)

  remote.log('Transpile source')
  remote.sudo(`cd ~/${app} && npm run build`, user)

  remote.log('Create public directory')
  remote.sudo(`cd ~/${app} && npm run public`, user)

  remote.log(`Try to delete old ${app} version`)
  remote.sudo(`pm2 delete ${app}`, {user, failsafe: true})

  remote.log(`Boot up new ${app} version`)
  remote.sudo(`cd ~/${app} && npm run production`, user)
})
