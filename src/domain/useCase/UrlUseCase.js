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

    async getUrl(shortId) {
        let urlEntity = new UrlEntity(shortId, null, []);
    
        try {
            const result = await this.repository.getUrl(urlEntity);
            urlEntity = {
                ...urlEntity,
                redirectUrl: result.redirectUrl
            };
            return urlEntity;
        } catch (error) {
            console.error(`UrlUseCase: ${error}`);
        }
    }

    async getStats(shortId) {
        let urlEntity = new UrlEntity(shortId, null, []);

        try {
            const result = await this.repository.getStats(urlEntity);
            urlEntity = {
                ...result._doc
            };
            return urlEntity;
        } catch(error) {
            console.error(`UrlUseCase: ${error}`);
        }
    }
}

module.exports = UrlUseCase;