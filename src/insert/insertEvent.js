const insertEvent = async (calendar, { sale, reseller, representative, category, end, time, address, transport, packaging, invoice }) => {
	try {
		const newEvent = {
			'start': { 'dateTime': `${end}T${time}` },
			'end': { 'dateTime': `${end}T${time}` },
			'location': `${address}`,
			'summary': `${reseller}`,
			'description': `— Atendimento: ${sale}\n— Assessor: ${representative}\n— Categoria: ${category}\n— Forma: ${transport}\n— Fardo: ${packaging}\n— Nota: ${invoice}`,
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