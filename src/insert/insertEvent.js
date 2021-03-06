const formatDateTime = require('../utils/formatDateTime')

const insertEvent = async (calendar, {
	atendimento,
	assessor,
	lojista,
	categoria,
	tipo,
	despacho,
	horario,
	transporte,
	endereco,
	fardo,
	nota,
	observacoes
}) => {
	try {
		const eventDateTime = formatDateTime(despacho, horario)
		const newEvent = {
			'start': { 'dateTime': `${eventDateTime}` },
			'end': { 'dateTime': `${eventDateTime}` },
			'location': `${endereco}`,
			'summary': `${lojista}`,
			'description': `— Atendimento: ${atendimento}\n— Assessor: ${assessor}\n— Categoria: ${categoria}\n— Tipo: ${tipo}\n— Transporte: ${transporte}\n— Fardo: ${fardo}\n— Nota Fiscal: ${nota}\n— Observações: ${observacoes}`,
			'status': 'confirmed',
			'colorId': '11'
		}
		return await calendar.Events.insert(process.env.CALENDAR_ID, newEvent)
	} catch (error) {
		if (error.message) {
			console.log(error.message)
			return JSON.parse(error.message)
		}
		return null
	}
}

module.exports = insertEvent