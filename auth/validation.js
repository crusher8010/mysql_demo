const jwt = require("jsonwebtoken");

exports.Check = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, "fantastic", (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Access Denied! Unauthorized user."
                })
            } else {
                next();
            }
        })
    } else {
        return res.status(500).json({
            message: "Access Denied! Unauthorized user."
        })
    }
}