console.log(process.env.CLIENT_EMAIL)
console.log(process.env.PRIVATE_KEY)
console.log(process.env.CALENDAR_ID)

module.exports.serviceAcctId = process.env.CLIENT_EMAIL
module.exports.key = process.env.PRIVATE_KEY
module.exports.timezone = 'UTC+00:00'