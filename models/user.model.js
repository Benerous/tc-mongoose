const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: { type: String, minlength: 4, maxlength: 50, required: true },
        lastName: { type: String, minlength: 3, maxlength: 60, required: true },
        role: { type: String, enum: ['admin', 'writer', 'guest'], required: false, immutable: true },
        numberOfArticles: { type: Number, default: 0, required: false, immutable: false },
        nickname: { type: String, required: false, immutable: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);