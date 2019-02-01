const listEvent = require('./listEvent')

const list = async (calendar) => {
	const response = await listEvent(calendar)
	if (!response)
		return { status: 'listExecutionError', event: null }
	if (response.error) {
		return { status: 'listApiError', event: null }
		console.log(response.error.errorBody.error)
	}
	const [ event ] = response.filter( ({ id }) => id === 'kgcf91801avl6otrbj7l54l1ss')
	return { status: 'ok', event }
}

module.exports = list