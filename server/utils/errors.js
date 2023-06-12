export default class APIError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    get statusCode() {
        return this.statusCode;
    }

    set statusCode(statusCode) {
        this.statusCode = statusCode;
    }

}