require('dotenv').config()
const calendarAPI = require('node-google-calendar')
const response = require('../utils/response')
const settings = require('../utils/settings')
const list = require('../list/index')
const remove = require('../remove/index')
const insert = require('../insert/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	const calendar = new calendarAPI(settings)
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			const { status, event } = await list(calendar, JSON.parse(body))
			state = status
			if (state === 'ok') {
				state = await remove(calendar, event)
				if (state === 'ok')
					state = await insert(calendar, body)
			}
		}
	} catch (error) {
		console.log(error.message)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"sale":"10051", "reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-02-02", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST https://calendar.ziro.online/.netlify/functions/edit-event
// curl -d '{"sale":"10051", "reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-02-02", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST http://localhost:9000/edit-event