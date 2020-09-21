const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');
const express = require('express');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

router.use((req, res, next) => {
    let err = new Error('Invalid API Request');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    req.statusCode = err.status || 500;
    res.status(req.statusCode).send({
      message: err.message || err.errors,
      statusCode: req.statusCode
    });
});

module.exports = router;
