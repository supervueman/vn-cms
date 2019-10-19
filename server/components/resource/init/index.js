// Models
const ResourceType = require('../../../models/resourceType');

module.exports = async () => {
  let document_type = await ResourceType.findOne({
    where: {
      slug: 'document'
    }
  });

  if (!document_type) {
    document_type = await ResourceType.create({
      slug: 'document',
      title: 'Документ',
    });
  }
}
