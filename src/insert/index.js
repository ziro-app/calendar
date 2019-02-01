const insertEvent = require('./insertEvent')

const insert = async (calendar, body) => {
	const response = await insertEvent(calendar, JSON.parse(body))
	if (!response)
		return 'insertExecutionError'
	if (response.error) {
		return 'insertApiError'
		console.log(response.error.errorBody.error)
	}
	return 'ok'
}

module.exports = insert