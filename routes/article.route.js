const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

router
    .post('/', articleController.createArticle)
    .delete('/:id', articleController.removeArticle)
    .get('/', articleController.getArticles)
    .put('/:id', articleController.editArticle);
    
module.exports = router;