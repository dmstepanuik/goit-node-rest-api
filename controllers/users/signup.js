const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Conflict('Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = signup;
