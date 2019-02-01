const listEvent = require('./listEvent')

const list = async (calendar) => {
	const response = await listEvent(calendar)
	if (!response)
		return { status: 'listExecutionError', event: null }
	if (response.error) {
		return { status: 'listApiError', event: null }
		console.log(response.error.errorBody.error)
	}
	console.log(response)
	const [ event ] = response.filter( ({ id }) => id === 'kvpu33adrffhef7d39fr6ejmg8')
	return { status: 'ok', event }
}

module.exports = list