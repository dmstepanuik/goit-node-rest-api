const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getById = async (req, res) => {
  // console.log('getById', req, req.params);
  const { contactId } = req.params;
  // console.log('contactId', contactId);

  const result = await Contact.findOne({ _id: contactId });
  if (!result) {
    throw new NotFound('Not found');
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getById;
