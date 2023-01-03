const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const { sendEmail } = require('../../helpers');

const verificationToken = nanoid();
const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Conflict('Email in use');
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Подтверждения email',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Подтвердить email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    },
  });
};

module.exports = signup;
