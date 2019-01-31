require('dotenv').config()

const response = require('../response/index')
const listEvent = require('../listEvent/index')
const deleteEvent = require('../deleteEvent/index')
const insertEvent = require('../insertEvent/index')

const settings = require('../settings/index')
const calendarAPI = require('node-google-calendar')
const calendar = new calendarAPI(settings)

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	if (httpMethod !== 'POST')
		state = 'methodError'
	if (Object.keys(queryStringParameters).length !== 0)
		state = 'parametersError'
	if (state === 'ok') {
		try {
			const apiResponseList = await listEvent(calendar)
			if (!apiResponseList)
				state = 'executionError'
			if (apiResponseList.error) {
				state = 'apiError'
				console.log(apiResponseList.error.errorBody.error)
			}
			if (state === 'ok') {
				console.log(apiResponseList)
				const [ event ] = apiResponseList.filter( ({ id }) => id === 'lufn6di62oe0vltkkjik31e3sg' )
				console.log(event)
				const apiResponseDelete = await deleteEvent(calendar, event)
				if (!apiResponseDelete)
					state = 'executionError'
				if (apiResponseDelete.error) {
					state = 'apiError'
					console.log(apiResponseDelete.error.errorBody.error)
				}
			}
		} catch (error) {
			console.log(error.message)
			state = 'executionError'
		}
	}
	return response(state)
}

// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-31", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST https://calendar.ziro.online/.netlify/functions/edit-event
// curl -d '{"reseller": "THEWISH COMERCIAL LTDA", "representative": "Rubia", "category": "Troca", "end": "2019-01-31", "time": "17:00:00-02:00", "address": "Av. Tiradentes, 826", "transport": "Aplicativo de Entrega", "packaging": "Sacolas", "invoice": "Karmani, Absolutti"}' -X POST http://localhost:9000/edit-event