const moongose = require("mongoose");
const logger = require("../scripts/logger/user")

const UserSchema = new moongose.Schema({

    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    media: String,
    username: {
        type: String,
        unique: true,
    },

    friends: {

        type: [{ name: "String", image: "String", id: "String" }],
        default: []

    },
    friendRequest: {
        type: [{ name: "String", id: "String" }],
        default: []
    },
    sendRequest: {
        type: [{ name: "String", id: "String" }],
        default: []

    },
    blockUser: [{
        username: String,

    }
    ],

},
    {
        timestamps: true,
        versionKey: false
    })
UserSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message: doc,
    });
});


module.exports = moongose.model("user", UserSchema);