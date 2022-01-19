const UserService = require("../services/UserService");
const ApiError = require("../errors/ApiError")
const hs = require("http-status");
const uuid = require("uuid");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const path = require("path")
const { checkSecureFile } = require("../scripts/utils/helper")
const eventEmitter = require("../scripts/events/eventEmitter");



class UserController {
    index(req, res) {
        UserService.list().then((res) => {
            res.status(hs.OK).send(res)
        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    create(req, res, next) {
        req.body.password = passwordToHash(req.body.password)
        UserService.create(req.body).then(create => {

            eventEmitter.emit("send_create_email", {

                to: create.email,
                subject: "Üye Kayıdı Başarı ile tamamlandı ✔",

                html: `Merhaba ${create.first_name} ${create.last_name} Üyelik işleminiz başarı ile gerçekleştirilmiştir. <br /> Whatsapp'tan iyiyiz 🥳🥳. <h1> Pixa Software Company </h1>`,

            },
            )
            res.status(hs.OK).send(create)
        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    login(req, res, next) {
        req.body.password = passwordToHash(req.body.password)
        UserService.findOne(req.body)
            .then((user) => {
                if (!user) { return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı yok" }) }

                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateAccessToken(user),
                        refresh_token: generateRefreshToken(user),
                    }
                }
                delete user.password
                res.status(hs.OK).send({
                    code: 200,
                    message: "Giriş başarılı.",
                    user
                })

            })
            .catch(e => {
                next(new ApiError(e?.message))
            })

    }
    resetPassword(req, res, next) {
        const new_password = uuid.v4()?.split("-")[0] || `chat-app-${new Date().getTime()}`
        UserService.modify({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updateUser) => {
            if (!updateUser) {
                return next(new ApiError(e?.message))
            }
            eventEmitter.emit("send_email", {

                to: updateUser.email,
                subject: "Şifre Sıfırlama ✔",

                html: `Merhaba ${updateUser.first_name} ${updateUser.last_name} Şifre sıfırlama işleminiz başarı ile gerçekleştirilmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız. <br /> Yeni Şifreniz:<b>${new_password}</b> <h1> Pixa Chat-App </h1>`,
            },
            )
            res.status(hs.OK).send({
                code: 200,
                message: "E-posta Başarı ile gönderildi.",
                updateUser
            })

        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    updateUser(req, res, next) {
        if (!req.params?.id) {
            return next(new ApiError(e?.message))
        }
        UserService.update(req.params.id, req.body).then((updateUser) => {
            res.status(hs.OK).send({
                code: 200,
                message: "Güncelleme işlemi başarılı.",
                updateUser
            })

        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    deleteUser(req, res, next) {
        if (!res.params?.id) {
            return next(new ApiError(e?.message))
        }
        UserService.delete(req.params?.id).then((deleteUser) => {
            res.status(hs.OK).send({
                code: 200,
                message: "Kullanıcı başarı ile silindi",
                deleteUser

            })
        })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    changePassword(req, res) {
        req.body.password = passwordToHash(req.body.password)
        UserService.modify({ _id: req.user?._doc?._id }, req.body)
            .then((update) => {
                res.status(hs.OK).send({
                    code: 200,
                    message: "Şifre değiştirme başarılı.",
                    update
                })
            })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    profile(req, res, next) {
        console.log(req.user._doc?.username)
        if (!req.user._doc?.username) {
            return next(new ApiError(e?.message))
        }
        UserService.findOne({ username: req.user._doc?.username })
            .then((user) => {
                res.status(hs.OK).send({
                    code: 200,
                    msg: "Profil Bilgileri",
                    user
                })
            })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }

    addMedia(req, res, next) {

        if (!req.params.id || !req.files?.media || !checkSecureFile(req?.files?.media?.mimetype)) {
            return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi.." });
        }

        UserService.findOne({ _id: req.params.id }).then((profile) => {
            if (!profile) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });

            const extension = path.extname(req.files.media.name);
            const fileName = `${profile._id?.toString()}${extension}`;
            const folderPath = path.join(__dirname, "../", "uploads/profile", fileName);

            req.files.media.mv(folderPath, function (err) {
                if (err) return res.status(hs.INTERNAL_SERVER_ERROR).send(err);
                profile.media = fileName;
                UserService.update(req.params.id, profile)
                    .then((profile) => {
                        if (!profile) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
                        res.status(hs.OK).send({
                            code: 0,
                            msg: "Medya başarı ile eklendi",
                            profile
                        });
                    })
                    .catch((e) => next(new ApiError(e?.message)));
            });
        });
    }
    blockUser(req, res, next) {
        UserService.findOne({ _id: req.params.id })
            .then((main) => {
                console.log(main)
                if (!main) {
                    next(new ApiError(e?.message))

                }
                console.log(main)
                const block = {
                    ...req.body




                };
                console.log(block)

                main.blockUser.push(block);
                main.save().then((update) => {

                    return res.status(hs.OK).send(update)
                })
                    .catch((e) => {
                        next(new ApiError(e?.message))
                    })
            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })
    }





}

module.exports = new UserController()