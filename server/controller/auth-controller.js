const Auth = require("../models/auth-model");

const register = async (req, res) => {
    try {
        const {path: imageUrl, filename: cloudinaryId} = req.file;
        const { email, password, username, phone } = req.body;

        const userExists = await Auth.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            })
        }

        const user = new Auth.create({ email, password, username, phone, imageUrl, cloudinaryId });

        const token = user.generateToken();

        res.cookie("token", token,  {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000,
        })

        res.status(200).json({
            message: "User created successfully",
            success: true,
            data: user,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

module.exports = { register }