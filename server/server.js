require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5001
const ConnectDB = require('./config/db')
const authRouter = require('./router/auth-router')
const productRouter = require('./router/product-router')
const cartRouter = require('./router/cart-router')
const categoryRouter = require('./router/category-router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/getProductByCategory', categoryRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("Failed to connect to MongoDB")
})
