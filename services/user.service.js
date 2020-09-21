
function createUser(req) {
    const values = req.body;
    return {
        values
    };
};

function getUser(req) {
    const { id } = req.params;
    return id;
};

function removeUser(req) {
    const { id } = req.params;
    return id;
};

async function getArticles(req) {
    const { id } = req.params;
    return id;
};

function editUser(req) {
    const { id } = req.params;
    const newValues = req.body;
    return {
        id,
        newValues
    }
};

module.exports = {
    createUser,
    getUser,
    removeUser,
    getArticles,
    editUser
};