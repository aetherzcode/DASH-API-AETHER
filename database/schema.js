const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String},
    email: { type: String },
    apikey: { type: String },
    defaultKey: { type: String },
    premium: { type: Boolean },
    limit: { type: Number },
    requestToday: { type: Number },
    isAdmin: {
        type: Boolean,
        default: false
    },
    whatsappNumber: {
        type: String,
        default: null
    }
}, { versionKey: false });
module.exports.User = mongoose.model('user', UserSchema);
