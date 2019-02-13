const removeEvent = require('./removeEvent')

const remove = async (calendar, event) => {
	const response = await removeEvent(calendar, event)
	if (!response)
		return 'removeExecutionError'
	if (response.error) {
		console.log(response.error.errorBody.error)
		return 'removeApiError'
	}
	return 'ok'
}

module.exports = remove