const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { type: String, minlength: 5, maxlength: 400, required: true , createIndexes: { text: true }},
        subtitle: { type: String, minlength: 5, required: false },
        description: { type: String, minlength: 5, maxlength: 5000, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
        category: { type: String, enum: ['sport', 'games', 'history'], required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Article', articleSchema);