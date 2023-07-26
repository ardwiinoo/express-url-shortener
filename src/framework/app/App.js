require("dotenv").config();
const express = require("express");
const Database = require("../database/Database");
const UrlUseCase = require("../../domain/useCase/UrlUseCase");
const UrlRepository = require("../repository/UrlRepository");
const UrlController = require("../../domain/useCase/controller/UrlController");
const createUrlRoutes = require("../../interface/routes/UrlRoutes");

class App {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    async start() {
        const url = `mongodb+srv://ardwiinoo:${process.env.DB_PASSWORD}@cluster0.vinrgt0.mongodb.net/?retryWrites=true&w=majority`;
        const database = new Database();
        try {
            await database.connect(url);
            this.app.listen(process.env.PORT, () => {
                console.log(`Server running on port ${process.env.PORT}`);
            });
        } catch(error) {
            console.error(`App: ${error}`);
        }
    }

    setupRoutes() {
        const urlRepository = new UrlRepository();
        const urlUseCase = new UrlUseCase(urlRepository);
        const urlController = new UrlController(urlUseCase);
        const urlRoutes = createUrlRoutes(urlController);

        this.app.use("/", urlRoutes.getUrlRouter());
    }

    setupMiddleware() {
        this.app.use(express.json());
    }
}

module.exports = App;