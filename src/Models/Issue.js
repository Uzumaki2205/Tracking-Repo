const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Issue = new Schema({
    repository: { type: String },
    title: { type: String },
    url: { type: String },
    user: { type: String },
    owner: { type: String },
    content: { type: String },
    edited: { type: String, default: 'No edited' },
    type: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', Issue);