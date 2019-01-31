const response = require('../response/index')
const insertEvent = require('../insertEvent/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	if (httpMethod !== 'POST')
		state = 'methodError'
	if (Object.keys(queryStringParameters).length !== 0)
		state = 'parametersError'
	if (state === 'ok') {
		try {
			const calendarResponse = await insertEvent(JSON.parse(body))
			if (!calendarResponse)
				state = 'executionError'
			if (calendarResponse.error) {
				state = 'apiError'
				console.log(calendarResponse.error.errorBody.error)
			}
		} catch (error) {
			console.log(error)
			state = 'executionError'
		}
	}
	return response(state)
}

// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-31", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST https://calendar.ziro.online/.netlify/functions/insert-event
// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-31", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST http://localhost:9000/insert-event