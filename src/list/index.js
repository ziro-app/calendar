const listEvent = require('./listEvent')

const list = async (calendar, { sale }) => {
	const response = await listEvent(calendar)
	if (!response)
		return { status: 'listExecutionError', event: null }
	if (response.error) {
		return { status: 'listApiError', event: null }
		console.log(response.error.errorBody.error)
	}
	const [ event ] = response.filter( ({ description }) => description.substring(20,15) === sale)
	return { status: 'ok', event }
}

module.exports = list