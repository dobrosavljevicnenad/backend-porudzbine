const mongoose = require('mongoose');

const CompanyHistorySchema = new mongoose.Schema({
    name: {type: String}
})

module.exports = mongoose.model('CompanyHistory', CompanyHistorySchema);