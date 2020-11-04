const express = require('express');
const router = express.Router();
const utilError = require('../../helpers/utilError');
const authorizer = require('../../middleware/authorizer');
const bcrypt = require('bcrypt');
const db = require('../../models');
const uuid = require('uuid').v4;

router.get('/', authorizer, async (req, res, next) => {
    try {
        var {page, limit} = req.query;
        var orderBy = req.query.orderBy ? req.query.orderBy : 'name';
        var orderDir = req.query.orderDir ? req.query.orderDir : 'DESC';

        const { docs, pages, total } = await db.products.paginate({
            page: parseInt(page),
            paginate: parseInt(limit),
            order: [[orderBy, orderDir]],
          })

        res.status(200).send({
            products: docs, 
            pages, 
            total,
            message: 'Successfully selected products!'
        });
    } catch (err) {
        utilError(req, res, err);
    }
});

router.post('/', authorizer, async (req, res, next) => {
    try {
        var buildProduct = await db.products.build({
            id: uuid(),
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await buildProduct.save();

        res.status(200).send({
            product: buildProduct,
            message: 'Successfully created product!'
        });
    } catch (err) {
        utilError(req, res, err);
    }
});

router.put('/:productId', authorizer, async (req, res, next) => {
    try {

        var product = await db.products.findOne({
            where:{
                id: req.params.productId
            }
        });

        await product.update({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });

        product = await db.products.findOne({
            where:{
                id: req.params.productId
            }
        });

        res.status(200).send({
            product,
            message: 'Successfully edited product!'
        });
    } catch (err) {
        utilError(req, res, err);
    }
});

router.delete('/:productId', authorizer, async (req, res, next) => {
    try {
        await db.products.destroy({
            where: {
                id: req.params.productId
            }
        })

        res.status(200).send({
            message: 'Successfully deleted product!'
        });
    } catch (err) {
        utilError(req, res, err);
    }
});

router.get('/:productId', authorizer, async (req, res, next) => {
    try {
        var product = await db.products.findOne({
            where:{
                id: req.params.productId
            }
        });

        res.status(200).send({
            product,
            message: 'Successfully selected product!'
        });
    } catch (err) {
        utilError(req, res, err);
    }
});

module.exports = router;