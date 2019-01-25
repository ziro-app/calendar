const settings = require('./settings.js')
const calendarAPI = require('node-google-calendar')
const calendar = new calendarAPI(settings)

const runCalendar = async ({ Events }) => {
	try {
		const myEvents = await Events.list(id, {
			timeMin: '2018-05-20T06:00:00+08:00',
			timeMax: '2019-05-25T22:00:00+08:00'
		})
		console.log(myEvents.length)
	} catch (error) {
		console.log(JSON.parse(error.message))
	}
}

runCalendar(calendar)