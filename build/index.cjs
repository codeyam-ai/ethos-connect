'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ethos-connect-staging.prod.cjs')
} else {
  module.exports = require('./ethos-connect-staging.dev.cjs')
}
