require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5001
const ConnectDB = require('./config/db')
const authRouter = require('./router/auth-router')
const productRouter = require('./router/product-router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("Failed to connect to MongoDB")
})
