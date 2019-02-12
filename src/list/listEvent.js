const oneYearFromNow = require('../utils/oneYearFromNow')

const listEvent = async (calendar) => {
	try {
		const params = {
			timeMin: '2019-01-01T05:00:00-00:00',
			timeMax: `${oneYearFromNow()}-00:00`
		}
		return await calendar.Events.list(process.env.CALENDAR_ID, params)
	} catch (error) {
		if (error.message) {
			console.log(error.message)
			return JSON.parse(error.message)
		}
		return null
	}
}

module.exports = listEvent