let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// Player model
let User = require('../models/User');
let Player = require('../models/Player');

router.post('/create-user', upload.array('avatar', 6), (req, res, next) => {
  const reqFiles = []
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/public/' + new Date().getTime() + req.files[i].filename)
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    avatar: reqFiles
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Done upload!",
      userCreated: {
        _id: result._id,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

router.post('/add-player', (req, res) => {
  const player = new Player({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    mobile: req.body.mobile,
    wado: req.body.wado,
    panchayat: req.body.panchayat,
    taluka: req.body.taluka,
    lastDPL: req.body.lastDPL,
    gdsClub: req.body.gdsClub,
    batting: req.body.batting,
    bowling: req.body.bowling,
    wk: req.body.wk,
    registrationDate: req.body.registrationDate,
    photo: req.body.photo,
    paymentPerson: req.body.paymentPerson
  });
  player.save().then(result => {
    res.status(201).json({
      message: "Done Adding User!",
      userCreated: {
        _id: result._id,
        firstName: result.firstName,
        middleName: result.middleName,
        lastName: result.lastName,
        day: result.day,
        month: result.month,
        year: result.year,
        mobile: result.mobile,
        wado: result.wado,
        panchayat: result.panchayat,
        taluka: result.taluka,
        lastDPL: result.lastDPL,
        gdsClub: result.gdsClub,
        batting: result.batting,
        bowling: result.bowling,
        wk: result.wk,
        registrationDate: result.registrationDate,
        photo: result.photo,
        paymentPerson: result.paymentPerson
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

router.get("/", (req, res) => {
  Player.find().then(data => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      users: data
    });
  });
});

module.exports = router;