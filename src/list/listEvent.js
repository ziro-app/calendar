const oneYearFromNow = require('../utils/oneYearFromNow')

const listEvent = async (calendar, atendimento) => {
	try {
		const params = {
			timeMin: '2019-01-01T00:00:00-00:00',
			timeMax: `${oneYearFromNow()}-00:00`,
			q: `${atendimento}`
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