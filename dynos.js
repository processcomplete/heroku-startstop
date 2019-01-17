const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const log = require("debug")("dynos:log")

const maintenance = (name, status) => {
  log(`Maintenance: ${status} - ${name}`)
  return heroku.patch(`/apps/${name}`, {
    body: {
      maintenance: status
    }
  })
}

const scaleToZero = name => {
  log(`Stopping ${name}`)
  return heroku.patch(`/apps/${name}/formation`, {
    body: {
      updates: [
        { quantity: 0, type: 'web' }
      ]
    }
  }).then(() => maintenance(name, true))
}

const scaleToOne = name => {
  log(`Starting ${name}`)
  return heroku.patch(`/apps/${name}/formation`, {
    body: {
      updates: [
        { quantity: 1, type: 'web' }
      ]
    }
  }).then(() => maintenance(name, false))
}

const stop = (names) => {
  return Promise.all(names.map(scaleToZero))
}

const start = (names) => {
  return Promise.all(names.map(scaleToOne))
}

module.exports = {
  stop,
  start,
  maintenance
}