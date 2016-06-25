const bunyan = require('bunyan')
const bunyanPrettyStream = require('bunyan-prettystream')
const logentriesLogger = require('le_node')

// Settings and defaults
const name = process.env.FC_LOG_NAME || 'fullcube'
const level = process.env.FC_LOG_LEVEL || 'debug'
const logentriesToken = process.env.LOGENTRIES_TOKEN || false
const logentriesLevel = process.env.LOGENTRIES_LEVEL || level

// Array of streams
const streams = []

// Define the PrettyStream
const prettyStdOut = new bunyanPrettyStream()
prettyStdOut.pipe(process.stdout)

streams.push({
  level,
  type: 'raw',
  stream: prettyStdOut,
})

// Define the Logentries stream
if (logentriesToken) {
  streams.push(logentriesLogger.bunyanStream({
    token: logentriesToken,
    minLevel: logentriesLevel,
  }))
}

// Configure the main logger object
const logger = bunyan.createLogger({ name, streams })

module.exports = logger