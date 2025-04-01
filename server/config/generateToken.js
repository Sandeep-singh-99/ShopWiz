const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d' })

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    return token
}

module.exports = generateToken