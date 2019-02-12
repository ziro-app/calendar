const moment = require('moment-timezone')

const formatDateTime = (date, time) =>
	moment(`${date}T${time}:00`).tz('America/Sao_Paulo').format()

module.exports = formatDateTime

// '2019-02-14T00:00:00-00:00'