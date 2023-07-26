const shortid = require("shortid");
const HttpResponse = require("../../../../src/interface/middleware/HttpResponse");

class UrlController {
    constructor(urlUseCase) {
        this.useCase = urlUseCase;
    }

    async createUrl(req, res) {
        const body = req.body;

        if(!body.url) return res.status(400).json({error: "Url is required"});

        const shortId = shortid(); 
        try {
            const createdUrl = await this.useCase.createUrl(shortId, body.url);
            const onSuccess = HttpResponse.onSuccess('Successfully create url', createdUrl);
            res.status(200).json(onSuccess);
        } catch(error) {
            console.error(`UrlController: ${error}`);
            const onError = HttpResponse.onError('Failed to create url', 500);
            res.status(500).json(onError);
        }
    }

    async getUrl(req, res) {
        const shortId = req.params.shortId;

        try {
            const entryUrl = await this.useCase.getUrl(shortId);
            res.redirect(entryUrl.redirectUrl);
        } catch(error) {
            console.error(`UrlController: ${error}`);
            const onError = HttpResponse.onError('Failed to get url', 500);
            res.status(500).json(onError);
        }
    }

    async getStats(req, res) {
        const shortId = req.params.shortId;

        try {
            const entryStats = await this.useCase.getStats(shortId);
            res.status(200).json({
                totalAccess: entryStats.visitHistory.length,
                stats: entryStats.visitHistory
            });
        } catch(error) {
            console.error(`UrlController: ${error}`);
            const onError = HttpResponse.onError('Failed to get stats', 500);
            res.status(500).json(onError);
        }
    }
}

module.exports = UrlController;