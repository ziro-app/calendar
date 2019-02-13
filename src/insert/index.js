const insertEvent = require('./insertEvent')

const insert = async (calendar, body) => {
	const response = await insertEvent(calendar, JSON.parse(body))
	if (!response)
		return 'insertExecutionError'
	if (response.error) {
		console.log(response.error.errorBody.error)
		return 'insertApiError'
	}
	return 'ok'
}

module.exports = insert