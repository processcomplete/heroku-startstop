const dynos = require('./heroku')
const log = require("debug")("start:log")

const names = process.argv.splice(2)
if (!names || names.length < 1) {
  throw new Error("Must specify app name(s)")
}

if (!names.every(name => /^[a-z0-9-]+$/.test(name))) {
  throw new Error("Invalid app name(s)")
}

dynos.start(names).then(() => log(`Started ${names}`)).catch(console.error)