const Joi = require("joi")
const { validationErrorHandler } = require("../scripts/utils/validationErrorHandler")

const createUser = Joi.object({
    first_name: Joi.string().required().min(3).error(validationErrorHandler),
    last_name: Joi.string().required().min(3).error(validationErrorHandler),
    email: Joi.string().email().required().min(8).error(validationErrorHandler),
    password: Joi.string().required().min(8).error(validationErrorHandler),
    username: Joi.string().required().min(3).error(validationErrorHandler),

})
const loginUser = Joi.object({
    email: Joi.string().email().required().min(8).error(validationErrorHandler),
    password: Joi.string().required().min(8).error(validationErrorHandler),
})
const updateUser = Joi.object({
    first_name: Joi.string().required().min(3).error(validationErrorHandler),
    last_name: Joi.string().required().min(3).error(validationErrorHandler),
    email: Joi.string().email().required().min(8).error(validationErrorHandler),
    password: Joi.string().required().min(8).error(validationErrorHandler),
    username: Joi.string().required().min(3).error(validationErrorHandler),

})
const resetPassword = Joi.object({
    password: Joi.string().required().min(8).error(validationErrorHandler)

})

const changePassword = Joi.object({
    password: Joi.string().required().min(8).error(validationErrorHandler)
})

const blockUser = Joi.object({
    username: Joi.string().required().error(validationErrorHandler)
})


module.exports = {
    createUser,
    loginUser,
    updateUser,
    resetPassword,
    changePassword,
    blockUser,
}