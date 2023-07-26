const express = require("express");

class UrlRoutes {
    constructor(urlController) {
        this.router = express.Router();
        this.controller = urlController;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post("/url", this.controller.createUrl.bind(this.controller));
        this.router.get("/:shortId", this.controller.getUrl.bind(this.controller));
        this.router.get("/stats/:shortId", this.controller.getStats.bind(this.controller));
    }

    getUrlRouter() {
        return this.router;
    }
}

function createUrlRoutes(urlController) {
    return new UrlRoutes(urlController);
}

module.exports = createUrlRoutes;