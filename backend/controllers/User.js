// models/User.js

const mongoose = require("mongoose");
const { defaultMaxListeners } = require("nodemailer/lib/xoauth2");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true },    
    password: { type: String, required: true },               
    role: { type: String, default: "client" },                
    can_open: {type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);


const HistorySchema = new mongoose.Schema({
    email: { type: String, required: true },                                    
    unlockTime: { type: Date, default: Date.now },                                                            
}, { timestamps: true });

module.exports = mongoose.model("PassWordHistory", HistorySchema);

