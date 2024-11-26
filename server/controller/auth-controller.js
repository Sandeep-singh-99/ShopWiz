const Auth = require("../models/auth-model");
const Admin = require("../models/admin-model");

const register = async (req, res) => {
    try {
        // const {path: imageUrl, filename: cloudinaryId} = req.file;
        const imageUrl = req.file ? req.file.path : null;
        const cloudinaryId = req.file ? req.file.filename : null;
        const { email, password, username, phone } = req.body;

        const userExists = await Auth.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            })
        }

        const user = await Auth.create({ email, password, username, phone, imageUrl, cloudinaryId });

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

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            })
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            })
        }

        const token = user.generateToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000,
        })

        res.status(200).json({
            message: "User logged in successfully",
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

const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "User logged out successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = await Auth.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }

        res.status(200).json({
            message: "User is authenticated",
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const adminLogin = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Find the user by userId
        const adminUser = await Admin.findOne({ userId });

        if (!adminUser) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        
        // Respond with success if login is successful
        res.status(200).json({
            message: "Admin logged in successfully",
            success: true,
            adminUser,
        });
    } catch (error) {
        console.error("Login Error: ", error);  // Add logging for debugging
        res.status(500).json({
            message: "Something went wrong. Please try again later.",  // General error message for security
            success: false,
        });
    }
};


module.exports = { register, Login, Logout, checkAuth, adminLogin }
