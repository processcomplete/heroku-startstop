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

const size = (names, size) => {
  const resize = name => {
    log(`Resizing ${name}`)
    return heroku.patch(`/apps/${name}/formation`, {
      body: {
        updates: [
          { size, type: 'web' }
        ]
      }
    })
  }
  return Promise.all(names.map(resize))
}

const config = (names) => {
  return new Promise((resolve, reject) => {
    const get = name => heroku.get(`/apps/${name}/config-vars`)

    if (!Array.isArray(names)) {
      names = [names]
    }

    return Promise.all(names.map(get)).then(
      results => {
        const hash = results.reduce((hash, result, index) => {
          hash[names[index]] = result
          return hash
        }, {})
        resolve(hash)
      },
      reject
    )
  })
}

module.exports = {
  stop,
  start,
  size,
  maintenance,
  config
}