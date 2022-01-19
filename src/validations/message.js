const Joi = require("joi")
const { validationErrorHandler } = require("../scripts/utils/validationErrorHandler")

const addMessage = Joi.object({
    message: Joi.string().required().min(1).error(validationErrorHandler)
})


module.exports = {
    addMessage,
}