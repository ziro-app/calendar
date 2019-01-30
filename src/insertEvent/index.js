require('dotenv').config()
const settings = require('../settings/index')
const calendarAPI = require('node-google-calendar')

const insertEvent = async ({ reseller, representative, category, end, time, address, transport, packaging, invoice }) => {
	try {
		const calendar = new calendarAPI(settings)
		const newEvent = {
			'start': { 'dateTime': `${end}T${time}` },
			'end': { 'dateTime': `${end}T${time}` },
			'location': `${address}`,
			'summary': `${reseller}`,
			'description': `— Assessor: ${representative}\n— Categoria: ${category}\n— Forma: ${transport}\n— Fardo: ${packaging}\n— Nota: ${invoice}`,
			'status': 'confirmed',
			'colorId': '1'
		}
		console.log(newEvent)
		return await calendar.Events.insert(process.env.CALENDAR_ID, newEvent)
	} catch (error) {
		console.log(error)
	}
}

module.exports = insertEvent