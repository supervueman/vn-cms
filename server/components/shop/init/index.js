// Models
const Layout = require('../../layout/model');
const ResourceType = require('../../resourcetype/model');
const Field = require('../../field/model');

// Data
const layoutsData = require('../data/layouts.json');
const resourcetypesData = require('../data/resourcetypes.json');
const fieldsData = require('../data/fields.json');

// Init components
const cartInit = require('../components/cart/init');
const orderstatusInit = require('../components/orderstatus/init');
const orderInit = require('../components/order/init');
const deliveryInit = require('../components/delivery/init');
const productInit = require('../components/product/init');

module.exports = async () => {
  for await (let item of layoutsData) {
    const existItem = await Layout.findOne({
      where: {
        slug: item.slug
      }
    });

    if (!existItem) {
      await Layout.create({
        ...item
      });
    }
  }

  for await (let item of resourcetypesData) {
    const existItem = await ResourceType.findOne({
      where: {
        slug: item.slug
      }
    });

    if (!existItem) {
      await ResourceType.create({
        ...item
      });
    }
  }

  const productLayout = await Layout.findOne({
    where: {
      slug: 'product'
    }
  });

  for await (let item of fieldsData) {
    const existItem = await Field.findOne({
      where: {
        slug: item.slug
      }
    });

    item.layoutId = productLayout.id;

    if (!existItem) {
      const field = await Field.create({
        ...item
      });
      await field.addLayout(productLayout.id);
    }
  }

  await cartInit();
  await orderstatusInit();
  await orderInit();
  await deliveryInit();
  await productInit();
};
