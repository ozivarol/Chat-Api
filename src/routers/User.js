const express = require("express")
const schema = require("../validations/User")
const UserController = require("../controllers/UserController")
const authenticate = require("../middlewares/authenticate")
const validate = require("../middlewares/validate")
const idChecker = require("../middlewares/idChecker")

const router = express.Router()


router.route("/register").post(validate(schema.createUser, "body"), UserController.create)
router.route("/login").post(validate(schema.loginUser, "body"), UserController.login)
router.route("/reset-password").post(validate(schema.resetPassword, "body"), UserController.resetPassword)
router.route("/delete-profile/:id").delete(idChecker, authenticate, UserController.deleteUser)
router.route("/update-profile/:id").patch(idChecker, authenticate, validate(schema.updateUser), UserController.updateUser)
router.route("/profile/:username").get(authenticate, UserController.profile)
router.route("/profile/:id/add-media").post(idChecker, authenticate, UserController.addMedia)
router.route("/profile/block-user/:id").patch(idChecker, authenticate, UserController.blockUser)


module.exports = router;