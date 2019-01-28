const insertEvent = require('../insertEvent/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	}
	// const methodOk = httpMethod === 'POST'
	// const parametersOK = Object.keys(queryStringParameters).length === 0
	// if (methodOk)
	const result = await insertEvent()
	return {
		headers,
		statusCode: 200,
		body: JSON.stringify(result, null, 4)
	}
}

// curl -d '{"data": "example"}' -X POST https://calendar.ziro.online/.netlify/functions/insert-event
// curl -d '{"data": "example"}' -X POST http://localhost:9000/insert-event