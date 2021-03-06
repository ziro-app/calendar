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
			const { status, event } = await list(calendar, JSON.parse(body), 'edit')
			state = status
			if (state === 'ok') {
				state = await remove(calendar, event)
				if (state === 'ok')
					state = await insert(calendar, body)
			}
			if (state === 'ok-idDoesNotExist')
				state = await insert(calendar, body)
		}
	} catch (error) {
		console.log(error.message)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"atendimento":"10051", "assessor": "Rubia", "lojista": "THEWISH COMERCIAL LTDA", "categoria": "Troca", "tipo": "Online", "despacho": "14/fev/2019", "horario": "15:00", "transporte": "DIRETO DO FORNECEDOR", "endereco": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP", "fardo": "Livre", "nota": "Sem Nota", "observacoes": "Envio urgente"}' -X POST https://calendar.ziro.online/.netlify/functions/edit-event
// curl -d '{"atendimento":"10051", "assessor": "Rubia", "lojista": "THEWISH COMERCIAL LTDA", "categoria": "Troca", "tipo": "Online", "despacho": "14/fev/2019", "horario": "15:00", "transporte": "DIRETO DO FORNECEDOR", "endereco": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP", "fardo": "Livre", "nota": "Sem Nota", "observacoes": "Envio urgente"}' -X POST http://localhost:9000/edit-event