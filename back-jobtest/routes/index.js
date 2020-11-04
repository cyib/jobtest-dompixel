const express = require('express');
const router = express.Router();

const products = require('./api/products');

router.use('/products', products);

router.get('/', async (req, res, next) => {
    try {
        res.status(200).send("API Fullstack Job Test - DomPixel running");
    } catch (err) {
        utilError(req, res, err);
    }
});

module.exports = router;