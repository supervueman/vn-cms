// Models
const FieldCategory = require('../models/fieldCategory');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_field_categories_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const fieldCategories = await FieldCategory.findAll(filter);

    res.status(200).send(fieldCategories);
  },

  async findByPk(req, res) {
    if (!req.rules.is_field_categories_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const fieldCategory = await FieldCategory.findByPk(req.params.id, filter);

    if (!fieldCategory) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(fieldCategory);
  },

  async findOne(req, res) {
    if (!req.rules.is_field_categories_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const fieldCategory = await FieldCategory.findOne(filter);

    if (!fieldCategory) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(fieldCategory);
  },

  async create(req, res) {
    if (!req.rules.is_field_category_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const createdFieldCategory = await FieldCategory.create(req.body);

    res.status(200).send(createdFieldCategory);
  },

  async update(req, res) {
    if (!req.rules.is_field_category_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const fieldCategory = await FieldCategory.findByPk(req.body.id);

    if (!fieldCategory) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    const updateFieldCategory = req.body;
    delete updateFieldCategory.id;

    const updatedFieldCategory = await fieldCategory.update(updateFieldCategory);

    res.status(200).send(updatedFieldCategory);
  },

  async remove(req, res) {
    if (!req.rules.is_field_category_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const fieldCategory = await FieldCategory.findByPk(req.body.id);

    if (!fieldCategory) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    await FieldCategory.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Success!'
    });
  },

  async count(req, res) {
    if (!req.rules.is_field_categories_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const count = await FieldCategory.count(filter);

    res.status(200).send({
      count
    });
  }
}
