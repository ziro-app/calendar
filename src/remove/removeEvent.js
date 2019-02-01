const removeEvent = async (calendar, { id }) => {
	try {
		return await calendar.Events.delete(process.env.CALENDAR_ID, id, {})
	} catch (error) {
		if (error.message) {
			console.log(error.message)
			return JSON.parse(error.message)
		}
		return null
	}
}

module.exports = removeEvent