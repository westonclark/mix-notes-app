const express = require('express');
const db = require('../models/databaseModel.js');

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `userController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Missing required fields.` },
  };
};

const userController = {
  async storeUserData(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email == undefined || password == undefined) {
        return next(
          createErr({
            location: 'storeUserData',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }
      const { rows } = await db.query(`INSERT INTO users (email, password) VALUES ('${email}','${password}') RETURNING id, email`);
      res.locals.userInfo = rows[0];
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'storeSongData',
          type: 'writing to db',
          err,
        })
      );
    }
  },
};

module.exports = userController;
