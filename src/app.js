const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const helmet = require("helmet")
const { UserRoutes, MessageRoutes } = require("./routers")
const ApiError = require("./errors/ApiError")
const errorHandler = require("./middlewares/errorHandler")
const events = require("./scripts/events")
const fileUpload = require("express-fileupload")
const morgan = require("morgan");
const path = require("path");
const fs = require("fs")
const cors = require("cors")

config();
loaders();
events();
const app = express()
app.use(express.json())
app.use(
    express.urlencoded({

        extended: false,
    })
)

app.use(cors({
    methods: "*",
    origin: "*",


}));
app.use(helmet())
app.use(fileUpload());
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
app.use(morgan("combined", { stream: accessLogStream }))


app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ${process.env.PORT}`)



})
app.get('/main', (req, res) => {
    res.json({
        message: "Hello, welcome to Pixa Chat-App",
    });
})
app.use("/user", UserRoutes)
app.use("/message", MessageRoutes)
app.use((req, res, next) => {
    next(new ApiError(`There is no endpoint like ${req.path} for ${req.method} request.`, 404))
});
app.use(errorHandler);