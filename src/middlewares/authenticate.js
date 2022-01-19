const hs = require("http-status");
const JWT = require("jsonwebtoken");
const ApiError = require("../errors/ApiError")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = req.headers?.token;


    if (!token) {
        return next(new ApiError(e?.message))
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return next(new ApiError(err?.message))
        }
        req.user = user;
        next();
    })

}



module.exports = authenticateToken;