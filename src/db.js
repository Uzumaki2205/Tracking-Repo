const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_STRING, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Connect successfully!!");
    } catch (error) {
        console.log("Error when connect because " + error);
    }
}

module.exports = { connect };