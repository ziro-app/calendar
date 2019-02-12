const listEvent = require('./listEvent')

const list = async (calendar, { atendimento }, action) => {
	const response = await listEvent(calendar)
	if (!response)
		return { status: 'listExecutionError' }
	if (response.error) {
		return { status: 'listApiError' }
		console.log(response.error.errorBody.error)
	}
	const [ event ] = response.filter( ({ description }) =>
		description.substring(20,15) === atendimento
	)
	if (event && action === 'insert')
		return { status: 'idExistsError' }
	if (!event && action === 'edit')
		return { status: 'idDoesNotExistError' }
	return { status: 'ok', event }
}

module.exports = list