const Express = require('express');
const bcrypt = require('bcryptjs');

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `userController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err },
  };
};

const cookieController = {
  // Creating cookie using the userId
  async setCookie(req, res, next) {
    try {
      res.cookie('user_id', res.locals.user_id, { httpOnly: true });
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'setCookie',
          type: 'settingCookie',
          err: 'Failed to set Cookie',
        })
      );
    }
  },

  // Checking if the cookie exists
  async checkCookie(req, res, next) {
    try {
      // If no cookie exists, redirect to login page
      if (!req.cookies.user_id) {
        return res.redirect('/');
      } else {
        res.locals.user_id = req.cookies.user_id;
        return next();
      }
    } catch (err) {
      return next(
        createErr({
          location: 'checkCookie',
          type: 'checkingCookie',
          err: 'Failed to check Cookie',
        })
      );
    }
  },

  // Deleting the cookie from the session on log out or account deletion
  async deleteCookie(req, res, next) {
    try {
      res.clearCookie('user_id');
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'deleteCookie',
          type: 'deletingCookie',
          err: 'Failed to delete Cookie',
        })
      );
    }
  },
};
module.exports = cookieController;
