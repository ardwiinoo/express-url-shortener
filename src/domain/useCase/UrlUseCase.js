const UrlEntity = require("../entity/UrlEntity");

class UrlUseCase {
    constructor(urlRepository) {
        this.repository = urlRepository;
    }

    async createUrl(shortId, redirectUrl) {
        const urlEntity = new UrlEntity(shortId, redirectUrl, []);

        try {
            await this.repository.createUrl(urlEntity);
            return urlEntity;
        } catch(error) {
            console.error(`UrlUseCase: ${error}`);
        }
    }
}

module.exports = UrlUseCase;