require('dotenv').config()
const calendarAPI = require('node-google-calendar')
const response = require('../utils/response')
const settings = require('../utils/settings')
const list = require('../list/index')
const remove = require('../remove/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	const calendar = new calendarAPI(settings)
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			const { status, event } = await list(calendar, JSON.parse(body), 'remove')
			state = status
			if (state === 'ok')
				state = await remove(calendar, event)
		}
	} catch (error) {
		console.log(error.message)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"atendimento":"10051"}' -X POST https://calendar.ziro.online/.netlify/functions/remove-event
// curl -d '{"atendimento":"10051"}' -X POST http://localhost:9000/remove-event