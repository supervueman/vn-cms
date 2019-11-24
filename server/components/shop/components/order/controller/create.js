const Model = require('../model');
const Product = require('../../product/model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = req.body;
  item.ownerId = req.profile.id;
  if (req.adminAccess || req.managerAccess) {
    item.managerId = req.profile.id;
  }

  item.price = 0;

  if (req.body.products && req.body.products.length > 0) {
    for await (const product of req.body.products) {
      const productItem = await Product.findByPk(product.id);

      item.price += productItem.price * product.quantity;
    }
  }

  const createdItem = await Model.create(item);
  const dateNow = String(Date.now());
  const order_num = `MK-${dateNow.substr(0, 4)}/${dateNow.substr(dateNow.length - 4, 3)}${createdItem.id}`;

  const newItem = await Model.findByPk(createdItem.id);

  const updatedItem = await newItem.update({
    order_num
  });

  if (req.body.products && req.body.products.length > 0) {
    for await (const product of req.body.products) {
      await updatedItem.addProduct(product.id, {
        through: {
          quantity: product.quantity
        }
      });
    }
  }

  res.status(200).send(updatedItem);
};
