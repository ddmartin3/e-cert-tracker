'use strict';

var express = require('express'),
  techniciansModel= require('../models/techniciansModel.js'),

  router = express.Router();

router.route('/technicians')
  .get(function(req, res) {
    techniciansModel.find({}, function(err, technicians) {
      if (err) {
        res.send(err);

        return;
      }

      res.json(technicians);
    });
  })
  .post(function(req, res) {
    var postData = req.body,
      validationError = {
        type: 'Validation Error',
        message: ''
      };

    if (!postData.tech_name) {
      validationError.message = 'Name is required';
    }
    if (!postData.expire_date) {
      validationError.message = 'Expiration Date is required';
    }
    if (!postData.email) {
      validationError.message = 'Email is required';
    }
    if (!postData.lic_number) {
      validationError.message = 'License Number is required';
    }
    

    if (validationError.message) {
      res.json(validationError);

      return;
    }

    techniciansModel.insert(postData, function(err, newTechnician) {
      if (err) {
        res.send(err);

        return;
      }

      res.json(newTechnician);
    });
  });

router.route('/technicians/:id')
  .put(function(req, res) {
    techniciansModel.findOne({
      _id: req.params.id
    }, function(err, technician) {
      var prop;

      if (err) {
        res.send(err);

        return;
      }

      if (technician === null) {
        res.json({
          type: 'error',
          message: 'Did not find a technician with "id" of "' + req.params.id + '".'
        });

        return;
      }

      for (prop in req.body) {
        if (prop !== '_id') {
          technician[prop] = req.body[prop];
        }
      }

      techniciansModel.update({
        _id: technician._id
      }, technician, {}, function(err, numReplaced) {
        if (err) {
          res.send(err);

          return;
        }

        res.json({
          type: 'success',
          message: 'Replaced ' + numReplaced + ' technician(s).'
        });
      });
    });
  })
  .get(function(req, res) {
    techniciansModel.findOne({
      _id: req.params.id
    }, function(err, technician) {
      if (err) {
        res.send(err);

        return;
      }

      if (technician === null) {
        res.json({
          type: 'error',
          message: 'Did not find a technician with "id" of "' + req.params.id + '".'
        });

        return;
      }

      res.json(technician);
    });
  })
  .delete(function(req, res) {
    techniciansModel.remove({
      _id: req.params.id
    }, function(err, technician) {
      if (err) {
        res.send(err);
      }

      res.json({
        type: 'success',
        message: 'Successfully deleted technician with id "' + req.params.id + '".'
      });
    });
  });

module.exports = router;
