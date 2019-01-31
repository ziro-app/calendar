const response = (state) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	}
	const statusCode = 200
	const message = {
		methodError: 'Error. Invalid http method',
		parametersError: 'Error. Invalid parameters',
		listExecutionError: 'Error. Internal execution error on list function. Check logs',
		listApiError: 'Error. Bad request to calendar list API. Check logs',
		deleteExecutionError: 'Error. Internal execution error on delete function. Check logs',
		deleteApiError: 'Error. Bad request to calendar delete API. Check logs',
		insertExecutionError: 'Error. Internal execution error on insert function. Check logs',
		insertApiError: 'Error. Bad request to calendar insert API. Check logs',
		ok: 'Success'
	}
	const body = JSON.stringify(message[state], null, 4) 
	return { headers, statusCode, body }
}

module.exports = response