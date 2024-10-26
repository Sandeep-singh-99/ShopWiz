require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5001
const ConnectDB = require('./config/db')

app.use(express.json())
app.use(cors())

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("Failed to connect to MongoDB")
})
