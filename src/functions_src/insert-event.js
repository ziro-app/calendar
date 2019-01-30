const insertEvent = require('../insertEvent/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	}
	const methodOk = httpMethod === 'POST'
	const parametersOK = Object.keys(queryStringParameters).length === 0
	if (methodOk && parametersOK) {
		const result = await insertEvent(JSON.parse(body))
		return {
			headers,
			statusCode: 200,
			body: JSON.stringify(result, null, 4)
		}
	} else {
		return {
			headers,
			statusCode: 200,
			body: JSON.stringify({ message: 'Error. Check method or query parameters' }, null, 4)
		}
	}
}

// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-30", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST https://calendar.ziro.online/.netlify/functions/insert-event
// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-30", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST http://localhost:9000/insert-event