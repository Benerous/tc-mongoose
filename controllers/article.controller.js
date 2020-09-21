const articleService = require('../services/article.service');
const { User, Article } = require('../models/index');
const e = require('express');

module.exports = {
    createArticle,
    getArticles,
    removeArticle,
    editArticle
};

async function createArticle(req, res, next){
    try {
        const returnFromService = await articleService.createArticle(req);
        const { values } = returnFromService;
        const user = await User.findById(values.owner);
        if (user) {
            const newArticle = new Article(values);
            const newArticleSaved = await newArticle.save();
            const countOfArticles = (await Article.find({ owner: values.owner })).length;
            const updatedUser = await User.findByIdAndUpdate(values.owner, { numberOfArticles: countOfArticles }, { new: true });
            return res.status(201).send(newArticleSaved);
        } else {
            const err = new Error("User was not found!")
            return next(err);
        }
    } catch(err) {
        next(err);
    }
};

async function getArticles(req, res, next){
    try {
        const returnFromService = await articleService.getArticles(req);
        const { values } = returnFromService;
        const articles = await Article.find(values).populate('owner');
        if (articles.length) {
            return res.status(200).send(articles);
        } else {
            const err = new Error("Articles were not found!")
            return next(err);
        }
    } catch(err) {
        next(err);
    }
};

async function removeArticle(req, res, next){
    try {
        const returnFromService = await articleService.removeArticle(req);
        const removedArticle = await Article.findByIdAndRemove(returnFromService);
        if (removedArticle) {
            const userId = removedArticle.owner;
            const user = await User.findById(userId);
            if (user) {
                const countOfArticles = (await Article.find({ owner: userId })).length;
                const updatedUser = await User.findByIdAndUpdate(userId, { numberOfArticles: countOfArticles }, { new: true });
                return res.status(200).send({ message: "Successfully removed!" });
            }
        } else {
            const err = new Error("Article/Owner was not found!")
            return next(err);
        }
    } catch(err) {
        next(err);
    }
};


async function editArticle(req, res, next){
    try {
        const returnFromService = await articleService.editArticle(req);
        const { id, newValues } = returnFromService;
        const editedArticle = await Article.findByIdAndUpdate(id, newValues, { runValidators: true, new: true });
        if (editedArticle) {
            const userId = editedArticle.owner;
            const user = await User.findById(userId);
            if (user) {
                return res.status(200).send(editedArticle);
            }
        } else {
            const err = new Error("Article/Owner was not found!")
            return next(err);
        }
    } catch(err) {
        next(err);
    }
};