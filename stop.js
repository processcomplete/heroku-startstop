const dynos = require('./heroku')
const log = require("debug")("stop:log")

const names = process.argv.splice(2)
if (!names || names.length < 1) {
  throw new Error("Must specify app name(s)")
}

if (!names.every(name => /^[a-z0-9-]+$/.test(name))) {
  throw new Error("Invalid app name(s)")
}

dynos.stop(names).then(() => log(`Stopped ${names}`)).catch(console.error)