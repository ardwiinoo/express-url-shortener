const URL = require("../model/Url");

class UrlRepository {
    async createUrl(urlEntity) {
        try {
            await URL.create(urlEntity);
        } catch(error) {
            console.error(`UrlRepository: ${error}`);
        }
    }

    async getUrl(urlEntity) {
        try {
          return await URL.findOneAndUpdate(
                { shortId: urlEntity.shortId },
                {
                    $push: {
                        visitHistory: {
                            timestamp: Date.now(),
                        },
                    },
                },
                { new: true }
            );
        } catch (error) {
            console.error(`UrlRepository: ${error}`);
        }
    }

    async getStats(urlEntity) {
        try {
            return await URL.findOne({
                shortId: urlEntity.shortId,
            });
        } catch(error) {
            console.error(`UrlRepository: ${error}`);
        }
    }
}

module.exports = UrlRepository;