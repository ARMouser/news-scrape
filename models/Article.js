var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema ({
    title: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    note: {
        type: String,
    },
    saved: {
        type: Boolean,
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;