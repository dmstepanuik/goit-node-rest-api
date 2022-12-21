const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, favoriteShema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  '/:contactId/favorite',
  validation(favoriteShema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

module.exports = router;
