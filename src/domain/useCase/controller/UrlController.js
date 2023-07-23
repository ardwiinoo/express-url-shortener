const shortid = require("shortid");

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
            res.status(200).json({ createdUrl });
        } catch(error) {
            console.error(`UrlController: ${error}`);
        }
    }
}

module.exports = UrlController;