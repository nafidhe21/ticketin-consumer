const User = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*********************** POST *************************/

// create new user
router.post(`/register`, async (req, res) => {
  let user = new User({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.passwordHash),
    phoneNumber: req.body.phoneNumber,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    user = await user.save();
    if (!user)
      return res.status(400).send('the user cannot be created....');

    res.send(user);
  } catch (err) {
    res.send(err)
  }
});

// login user
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('The user not found');
  };

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    
    const token = jwt.sign(
      {
        user_id : user.id,
        username: user.username,
        email: user.email
      },
      process.env.SECRET,
      {expiresIn : '1d'}
    )

    res.status(200).send({email: user.email, token: token});
  } else {
    return res.status(200).send('The password is incorrect');
  }
});

/*********************** GET *************************/

// get all user
router.get(`/`, async (req, res) => {
  const userList = await User.find().select('-passwordHash');
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// get user by email or username
router.get(`/getuser`, async (req, res) => {
  if(req.body.username != undefined) {
    let user = await User.findOne({username: req.body.username});
    if(!user) {
      return res.status(400).send('cant find user with username');
    }
    return res.status(200).send(user);
  } else if (req.body.email != undefined) {
    let user = await User.findOne({email: req.body.email});
    if(!user) {
      res.status(400).send('cant find user with email');
    }
    return res.status(200).send(user);
  } else {
    return res.send('didnt send username/email');
  }

});

// get user data with user_id
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(500).json({ success: false });
  };
  res.send(user);
});

/*********************** DELETE *************************/

router.delete('/:id', async (req, res) => {
  User.findByIdAndRemove(req.params.id).then(user => {
    if (user) {
      return res.status(200).json({ success: true, message: 'the user has been deleted' });
    } else {
      return res.status(404).json({ success: false, message: 'the user not found' });
    };
  }).catch(err => {
    return res.status(400).json({ success: false, error: err });
  });
});

/*********************** PUT *************************/
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
    { new: true }
  )

  if (!user) {
    return res.status(400).send('the user cannot be created');
  }

  res.send(user);
})

module.exports = router;
