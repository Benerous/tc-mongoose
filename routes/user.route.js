const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router
    .post('/', userController.createUser)
    .get('/:id', userController.getUser)
    .delete('/:id', userController.removeUser)
    .get('/:id/articles', userController.getArticles)
    .put('/:id', userController.editUser);
    
module.exports = router;