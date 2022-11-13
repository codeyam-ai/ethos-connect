'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ethos-connect.prod.cjs')
} else {
  module.exports = require('./ethos-connect.dev.cjs')
}
