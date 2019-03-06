const dynos = require('./heroku')
const log = require("debug")("size:log")

const size = process.argv[2]
if (!size || ['free', 'hobby', 'standard-1x', 'standard-2x', 'professional-l', 'professional-m'].indexOf(size) === -1) {
  throw new Error("Must specify size")
}

const names = process.argv.splice(3)
if (!names || names.length < 1) {
  throw new Error("Must specify app name(s)")
}

if (!names.every(name => /^[a-z0-9-]+$/.test(name))) {
  throw new Error("Invalid app name(s)")
}

dynos.size(names, size).then(() => log(`Resized ${names} to ${size}`)).catch(console.error)