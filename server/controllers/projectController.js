const express = require('express');
const db = require('../models/databaseModel.js');

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `projectontroller.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Missing required fields.` },
  };
};

const projectController = {
  async createProject(req, res, next) {
    try {
      const { name, locked, user_id } = req.body;
      if (name == undefined || locked == undefined || user_id == undefined) {
        return next(
          createErr({
            location: 'createProject',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }

      if (locked) {
        const { rows } = await db.query(`INSERT INTO projects (name, password, locked, user_id) VALUES ('${name}','${password}','${locked}','${user_id}') RETURNING name, password, locked, user_id`);
        res.locals.projectInfo = rows[0];
        return next();
      } else {
        const { rows } = await db.query(`INSERT INTO projects (name, locked, user_id) VALUES ('${name}','${locked}','${user_id}') RETURNING name, locked, user_id`);
        res.locals.projectInfo = rows[0];
        return next();
      }
    } catch (err) {
      return next(
        createErr({
          location: 'createProject',
          type: 'writing to db',
          err,
        })
      );
    }
  },

  async getProjects(req, res, next) {
    try {
      const { user_id } = req.params;
      if (user_id == undefined) {
        return next(
          createErr({
            location: 'getProjects',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }

      const { rows } = await db.query(`SELECT * from projects WHERE user_id = '${user_id}'`);
      res.locals.projectList = rows;
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'getProjects',
          type: 'reading from db',
          err,
        })
      );
    }
  },
};

module.exports = projectController;
