const express = require("express")
const MessageController = require("../controllers/MessageController")
const authenticate = require("../middlewares/authenticate")
const validate = require("../middlewares/validate")
const schema = require("../validations/message")
const router = express.Router()



router.route("/new-message").post(authenticate, MessageController.newMessage)
router.route("/:id/add-message").post(authenticate, validate(schema.addMessage, "body"), MessageController.makeMessage)
router.route("/:id/my-message").get(authenticate, MessageController.fetchTask)



module.exports = router; 