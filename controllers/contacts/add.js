const { Contact } = require('../../models');

const add = async (req, res) => {
  console.log(req.body);
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
