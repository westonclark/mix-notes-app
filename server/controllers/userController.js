const express = require('express');
const db = require('../models/databaseModel.js');
const bcrypt = require('bcryptjs');

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `userController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err },
  };
};

const userController = {
  // Create User
  async storeUserData(req, res, next) {
    try {
      const { email, password } = req.body;

      if (email == undefined || email == '' || password == '' || password == undefined) {
        return next(
          createErr({
            location: 'storeUserData',
            type: 'request body',
            err: 'Missing Required Fields',
          })
        );
      }

      const hash = await bcrypt.hash(password, 5);

      const { rows } = await db.query(`INSERT INTO users (email, password) VALUES ('${email}','${hash}') RETURNING id, email`);

      res.locals.user_id = rows[0].id;
      res.locals.match = true;
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'storeSongData',
          type: 'writing to db',
          err: 'Error Creating User',
        })
      );
    }
  },

  // Verify User
  async verifyUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email == undefined || email == '' || password == '' || password == undefined) {
        return next(
          createErr({
            location: 'verifyUser',
            type: 'request body',
            err: 'Missing Required Fields',
          })
        );
      }
      const { rows } = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

      if (!rows.length)
        return next(
          createErr({
            location: 'verifyUser',
            type: 'reading from db',
            err: 'Incorrect Email or Password',
          })
        );

      const match = await bcrypt.compare(password, rows[0].password);

      if (match) {
        res.locals.user_id = rows[0].id;
        res.locals.match = match;

        return next();
      } else {
        return next(
          createErr({
            location: 'verifyUser',
            type: 'reading from db',
            err: 'Incorrect Email or Password',
          })
        );
      }
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'verifyUser',
          type: 'reading from db',
          err: 'Incorrect Email or Password',
        })
      );
    }
  },
};

module.exports = userController;
