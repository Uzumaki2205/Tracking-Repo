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

module.exports = { AllRecord, QueryRecord };