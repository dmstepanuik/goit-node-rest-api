const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const { joiSignUpSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get(
  '/current',
  auth,

  ctrlWrapper(ctrl.getCurrent)
);

module.exports = router;
