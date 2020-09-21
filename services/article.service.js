
function createArticle(req) {
    const values = req.body;
    return {
        values
    }
};

function getArticles(req) {
    const values= req.body;
    return {
        values
    };
};

function removeArticle(req) {
    const { id } = req.params;
    return id;
};

function editArticle(req) {
    const { id } = req.params;
    const newValues = req.body;
    return {
        id,
        newValues
    }
};

module.exports = {
    createArticle,
    getArticles,
    removeArticle,
    editArticle
};