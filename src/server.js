const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const requestIp = require('request-ip');

require('./database/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestIp.mw())
app.use(routes)

app.listen(3333, () => {
    console.log('Server is running')
})