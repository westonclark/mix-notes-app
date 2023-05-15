// const Express = require('express');
// import bcrypt from 'bcryptjs';


// const cookieController = {
//   // Creating cookie using the userId
//   async setCookie(req, res, next) {
//     try {
//       res.cookie('userId', res.locals.user.id, { httpOnly: true });
//       return next();
//     } catch (err) {
//       return next({ log: 'Error in cookieController setCookie middleware', status: 500, message: err });
//     }
//   },

//   // Checking if the cookie exists
//   async checkCookie(req, res, next) {
//     try {
//       // If no cookie exists, redirect to login page
//       if (!req.cookies.userId) {
//         return res.redirect('/login');
//       }
//       return next();
//     } catch (err) {
//       return next({ log: 'Error in cookieController checkCookie middleware', status: 500, message: err });
//     }
//   },

//   // Deleting the cookie from the session on log out or account deletion
//   async deleteCookie(req, res, next) {
//     try {
//       res.clearCookie('userId');
//       return next();
//     } catch (err) {
//       return next({ log: 'Error in cookieController deleteCookie middleware', status: 500, message: err });
//     }
//   },
// };
// module.exports = cookieController;
