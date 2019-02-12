const insertEvent = async (calendar, {
	atendimento,
	assessor,
	lojista,
	categoria,
	tipo,
	despacho,
	horario,
	endereco,
	transporte,
	fardo,
	nota
}) => {
	try {
		const newEvent = {
			'start': { 'dateTime': `${despacho}T${horario}` },
			'end': { 'dateTime': `${despacho}T${horario}` },
			'location': `${endereco}`,
			'summary': `${lojista}`,
			'description': `— Atendimento: ${atendimento}\n— Assessor: ${assessor}\n— Categoria: ${categoria}\n— Tipo: ${tipo}\n— Transporte: ${transporte}\n— Fardo: ${fardo}\n— Nota Fiscal: ${nota}`,
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

	// "atendimento":"10051",
	// "assessor": "Rubia",
	// "lojista": "THEWISH COMERCIAL LTDA",
	// "categoria": "Troca",
	// "tipo": "Online",
	// "despacho": "2019-02-02",
	// "horario": "17:00:00-02:00",
	// "transporte": "DIRETO DO FORNECEDOR",
	// "endereco": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP",
	// "fardo": "Livre",
	// "nota": "Sem Nota"