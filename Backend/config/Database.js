const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/iNoteBook");
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = db;
