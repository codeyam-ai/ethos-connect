'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ethos-wallet-beta.prod.cjs')
} else {
  module.exports = require('./ethos-wallet-beta.dev.cjs')
}
