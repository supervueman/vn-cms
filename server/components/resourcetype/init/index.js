// Models
const Model = require('../model');

module.exports = async () => {
  let document_type = await Model.findOne({
    where: {
      slug: 'document'
    }
  });

  if (!document_type) {
    document_type = await Model.create({
      slug: 'document',
      title: 'Документ',
    });
  }
};
