var express = require('express');
var Footwear = require('../models/footwear');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  Footwear.find({})
    .then((fw) => {
      const data = {
        mainContent: {
          location: './table',
          data: {
            fw: fw
          }
        },
        currentRoute: 'sales'
      };
      res.render('layout', data);
    });
});

router.get('/sales', function (req, res, next) {
  res.redirect('/');
});

router.get('/add', function (req, res, next) {
  const data = {
    mainContent: {
      location: './addOrEdit.ejs',
      data: {
        op: 'add'
      }
    },
    currentRoute: 'add'
  }
  res.render('layout', data);
});

router.get('/edit/:id', function (req, res, next) {
  Footwear.findById(req.params.id)
    .then((fw) => {
      const data = {
        mainContent: {
          location: './addOrEdit.ejs',
          data: {
            op: 'edit',
            fw: fw
          }
        },
        currentRoute: 'edit'
      }
      res.render('layout', data);
    });
});

router.get('/delete/:id', function (req, res, next) {
  Footwear.findByIdAndDelete(req.params.id)
    .then(resp => {
      res.redirect('/');
    });
});

router.post('/sales/add', function (req, res, next) {
  console.log(req.body);
  Footwear.create(req.body)
    .then(resp => {
      res.redirect('/');
    });
});

router.post('/sales/edit', function (req, res, next) {
  const updated = {
    quantity: req.body.quantity,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
  };
  Footwear.findByIdAndUpdate(req.body._id, { $set: updated })
    .then(resp => {
      res.redirect('/');
    });
});

module.exports = router;
