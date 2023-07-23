const mongoose = require("mongoose");

class Database {
    async connect(url) {
        try {
            await mongoose.connect(url);
            console.log(`Database connected`);
        } catch(error) {
            console.error(`Database: ${error}`);
        }
    }   
}

module.exports = Database;