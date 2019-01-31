const oneYearFromNow = () => 
	new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().substr(0,19)

module.exports = oneYearFromNow