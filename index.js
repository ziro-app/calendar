require('dotenv').config()
const settings = require('./settings.js')
const calendarAPI = require('node-google-calendar')
const calendar = new calendarAPI(settings)

const runCalendar = async ({ Events }) => {
	try {
		const myEvents = await Events.list(process.env.CALENDAR_ID, {
			timeMin: '2018-05-20T06:00:00+08:00',
			timeMax: '2019-05-25T22:00:00+08:00'
		})
		console.log(myEvents.length)
		const newEvent = {
			'start': { 'dateTime': '2019-01-25T07:00:00+08:00' },
			'end': { 'dateTime': '2019-01-25T08:00:00+08:00' },
			'location': 'Coffeeshop',
			'summary': 'Breakfast',
			'status': 'confirmed',
			'description': '',
			'colorId': 1
		}
		const createdEvent = await Events.insert(process.env.CALENDAR_ID, newEvent)
		console.log(createdEvent)
	} catch (error) {
		console.log(JSON.parse(error.message))
	}
}

runCalendar(calendar)