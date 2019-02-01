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
		executionError: 'Error. Internal execution error on runtime. Check logs',
		idError: 'Error. The event to be edited does not exist',
		listExecutionError: 'Error. Internal execution error on list function. Check logs',
		listApiError: 'Error. Bad request to calendar list API. Check logs',
		removeExecutionError: 'Error. Internal execution error on remove function. Check logs',
		removeApiError: 'Error. Bad request to calendar remove API. Check logs',
		insertExecutionError: 'Error. Internal execution error on insert function. Check logs',
		insertApiError: 'Error. Bad request to calendar insert API. Check logs',
		ok: 'Success'
	}
	const body = JSON.stringify(message[state], null, 4) 
	return { headers, statusCode, body }
}

module.exports = response