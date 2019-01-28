const fs = require('fs')
fs.writeFileSync('./.env', `PRIVATE_KEY=${process.env.PRIVATE_KEY}\n`)

// don't run "npm run build" locally