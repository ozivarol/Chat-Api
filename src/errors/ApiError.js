class ApiError extends Error {

    constructor(message, statusCode, code) {
        super(message);

        switch (statusCode) {
            case 404:
                this.code = 404;
                break;

            case 400:
                this.code = 400;
                break;

            default:
                this.code = 3
                break;
        }

        this.msg = message;
        this.status = statusCode;
    }
}

module.exports = ApiError;