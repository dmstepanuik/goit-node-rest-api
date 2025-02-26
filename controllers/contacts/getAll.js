const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 2, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'id_name email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
