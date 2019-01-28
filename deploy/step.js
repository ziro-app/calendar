const fs = require('fs')
fs.writeFileSync('./key.json', `{ "private_key": "${process.env.PRIVATE_KEY}" }`)