const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId }).catch(
    e => {
      if (e.kind === 'ObjectId')
        throw new NotFound(`Not found id:${contactId} `);
      throw e;
    }
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = removeById;
