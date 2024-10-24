const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    email: { type: String, required: true },                                    
    unlockTime: { type: Date, default: Date.now },                                                        
}, { timestamps: true });

const PassWordHistory = mongoose.model("PassWordHistory", HistorySchema);

module.exports = PassWordHistory;

