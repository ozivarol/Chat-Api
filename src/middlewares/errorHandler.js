const logger = require("../scripts/logger/error")
module.exports = (error, req, res, next) => {

    logger.log({
        level: "error",
        message: {
            status: error.status || 500,
            message: error.message || "Internal Server Error....",
        },
    });


    res.json({
        error: {
            code: error.code || -3,
            msg: error.msg || "Internal Server Error....",
        },
    });
};