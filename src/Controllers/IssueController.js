const Issue = require('../Models/Issue');

async function AllRecord() {
    const filter = {};
    const all = await Issue.find(filter).sort([['timestamp', 'descending']]).limit(10);
    return all;
}

async function QueryRecord(filter, limited) {
    const data = await Issue.find(filter).sort([['timestamp', 'descending']]).limit(parseInt(limited));
    return data;
}

async function OneRecord(filter) {
    const data = await Issue.find(filter).limit(1);
    return data;
}

module.exports = { AllRecord, QueryRecord, OneRecord };