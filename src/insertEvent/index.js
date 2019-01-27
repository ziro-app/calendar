require('dotenv').config()
const settings = require('../settings/index')
const calendarAPI = require('node-google-calendar')

const insertEvent = async () => {
	try {
		const calendar = new calendarAPI(settings)
		const myEvents = await calendar.Events.list(process.env.CALENDAR_ID, {
			timeMin: '2018-05-20T06:00:00+08:00',
			timeMax: '2019-05-25T22:00:00+08:00'
		})
		console.log(myEvents.length)
		const newEvent = {
			'start': { 'dateTime': '2019-01-25T07:00:00+01:00' },
			'end': { 'dateTime': '2019-01-25T08:00:00+00:00' },
			'location': 'Coffeeshop',
			'summary': 'Breakfast',
			'status': 'confirmed',
			'description': 'VIP only',
			'sendNotifications': true,
			'attendees': [
				{ 'email': 'v@gmail.com', 'responseStatus': 'accepted' }
			],
			'colorId': 1
		}
		const createdEvent = await calendar.Events.insert(process.env.CALENDAR_ID, newEvent)
		return createdEvent
	} catch (error) {
		console.log(JSON.parse(error.message).error.errorBody)
	}
}

module.exports = insertEvent