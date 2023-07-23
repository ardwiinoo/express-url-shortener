class UrlEntity {
    constructor(shortId, redirectUrl, visitHistory) {
        this.shortId = shortId;
        this.redirectUrl = redirectUrl;
        this.visitHistory = visitHistory;
    }
}

module.exports = UrlEntity;