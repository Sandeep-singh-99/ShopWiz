export const authorizesRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action." });
        }
        next()
    }
}