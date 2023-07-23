const URL = require("../model/Url");

class UrlRepository {
    async createUrl(urlEntity) {
        try {
            await URL.create(urlEntity);
        } catch(error) {
            console.error(`UrlRepository: ${error}`);
        }
    }
}

module.exports = UrlRepository;