const removeEvent = require('./removeEvent')

const remove = async (calendar, event) => {
	const response = await removeEvent(calendar, event)
	if (!response)
		state = 'removeExecutionError'
	if (response.error) {
		state = 'removeApiError'
		console.log(response.error.errorBody.error)
	}
}

module.exports = remove