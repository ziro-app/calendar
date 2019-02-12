require('dotenv').config()
const calendarAPI = require('node-google-calendar')
const response = require('../utils/response')
const settings = require('../utils/settings')
const list = require('../list/index')
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
			const { status, event } = await list(calendar, JSON.parse(body), 'insert')
			state = status
			if (state === 'ok')
				state = await insert(calendar, body)
		}
	} catch (error) {
		console.log(error.message)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"atendimento":"10051", "assessor": "Rubia", "lojista": "THEWISH COMERCIAL LTDA", "categoria": "Troca", "tipo": "Online", "despacho": "2019-02-02", "horario": "17:00:00-02:00", "transporte": "DIRETO DO FORNECEDOR", "endereco": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP", "fardo": "Livre", "nota": "Sem Nota"}' -X POST https://calendar.ziro.online/.netlify/functions/insert-event
// curl -d '{"atendimento":"10051", "assessor": "Rubia", "lojista": "THEWISH COMERCIAL LTDA", "categoria": "Troca", "tipo": "Online", "despacho": "2019-02-02", "horario": "17:00:00-02:00", "transporte": "DIRETO DO FORNECEDOR", "endereco": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP", "fardo": "Livre", "nota": "Sem Nota"}' -X POST http://localhost:9000/insert-event