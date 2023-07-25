class HttpResponse {
    constructor(status, message, data, error_code) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error_code = error_code;
    }

    static onSuccess(message, data) {
        return new HttpResponse('Success', message, data, null);
    }  

    static onError(message, error_code) {
        return new HttpResponse('Failed', message, null, error_code);
    }
}

module.exports = HttpResponse;