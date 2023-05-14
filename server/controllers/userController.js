const express = require('express');
const db = require('../models/databaseModel.js');

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

// Error Creator
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `songController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in songController.${location}. Check server logs for more details.` },
  };
};

module.exports = userController;
