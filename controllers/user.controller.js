const userService = require('../services/user.service');
const { User, Article } = require('../models/index');

module.exports = {
  createUser,
  getUser,
  removeUser,
  getArticles,
  editUser
};

async function createUser(req, res, next){
  try {
      const returnFromService = await userService.createUser(req);
      const { values } = returnFromService;
      const newUser = new User(values);
      const newUserSaved = await newUser.save();
      return res.status(201).send(newUserSaved);
  } catch(err) {
      next(err);
  }
};

async function getUser(req, res, next){
  try {
      const returnFromService = await userService.getUser(req);
      const user = await User.findById(returnFromService);
      if (user) {
        const articles = await Article.find({ owner: returnFromService });
        return res.status(200).send({ user, articles });
      } else {
        const err = new Error("User was not found!")
        return next(err);
      }
  } catch(err) {
      next(err);
  }
};

async function removeUser(req, res, next){
  try {
      const returnFromService = await userService.removeUser(req);
      const removedUser = await User.findByIdAndRemove(returnFromService);
      const removedArticles = await Article.deleteOne({ owner: returnFromService });
      if (removedUser) {
        return res.status(200).send({ message: "Successfully removed!" });
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
      const returnFromService = await userService.getArticles(req);
      const articles = await Article.find({ owner: returnFromService });
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

async function editUser(req, res, next){
  try {
      const returnFromService = await userService.editUser(req);
      const { id, newValues } = returnFromService;
      const editedUser = await User.findByIdAndUpdate(id, newValues , { runValidators: true, new: true });
      if (editedUser) {
        return res.status(200).send(editedUser);
      } else {
        const err = new Error("User was not found!")
        return next(err);
      }
      
  } catch(err) {
      next(err);
  }
};