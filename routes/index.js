var express = require('express');
var Footwear = require('../models/footwear');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  Footwear.find({})
    .then((fw) => {
      res.render('layout', {
        fw: fw,
        state: 'sales'
      });
    });
});

router.get('/sales', function (req, res, next) {
  Footwear.find({})
    .then((fw) => {
      res.render('layout', {
        fw: fw,
        state: 'sales'
      });
    });
});

router.get('/add', function (req, res, next) {
  res.render('layout', {
    state: 'add'
  });
});

router.get('/edit/:pid', function (req, res, next) {
  Footwear.findOne({ pid: req.params.pid })
    .then((fw) => {
      res.render('layout', {
        fw: fw,
        state: 'edit'
      });
    });
});

router.get('/delete/:pid', function (req, res, next) {
  Footwear.deleteOne({ pid: req.params.pid })
    .then(resp => {
      return Footwear.find({});
    })
    .then((fw) => {
      res.render('layout', {
        fw: fw,
        state: 'sales'
      });
    });
});

router.post('/sales/add', function (req, res, next) {
  console.log(req.body);
  Footwear.create(req.body)
    .then(resp => {
      res.render('layout', {
        state: 'added'
      });
    });
});

router.post('/sales/edit', function (req, res, next) {
  Footwear.updateOne({ pid: req.body.pid }, { $set: req.body })
    .then(resp => {
      res.render('layout', {
        state: 'updated'
      });
    });
});

module.exports = router;
