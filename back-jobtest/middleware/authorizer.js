const { query } = require('express');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const jwtsecret = require('../config/secret')[env];
const utilError = require('../helpers/utilError');
const db = require('../models');

module.exports = async (req, res, next) => {
  try {
    let key = req.headers.authorization;
    
    // if (key) {
    //   let tokenKey = await db.apikeys.findOne({
    //     where: {
    //       key
    //     }
    //   })

    //   if(!tokenKey) throw Error('Não autorizado!');
    // }

    next();

  } catch (err) {
    utilError(req, res, err);
  }
};
