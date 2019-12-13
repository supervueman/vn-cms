// Models
const Model = require('../model');

module.exports = async () => {
  const rootContext = await Model.findOne({
    where: {
      slug: 'root'
    }
  });

  if (!rootContext) {
    await Model.create({
      slug: 'root'
    });
  }
};
