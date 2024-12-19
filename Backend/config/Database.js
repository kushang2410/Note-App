const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://kushangtanawala24:1234@cluster0.skaf2.mongodb.net/Note-app");
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
}

module.exports = db;