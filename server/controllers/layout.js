// Models
const Layout = require('../models/layout');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_layouts_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layouts = await Layout.findAll(filter);

    res.status(200).send(layouts);
  },

  async findByPk(req, res) {
    if (!req.rules.is_layouts_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layout = await Layout.findByPk(req.params.id, filter);

    if (!layout) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(layout);
  },

  async findOne(req, res) {
    if (!req.rules.is_layouts_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layout = await Layout.findOne(filter);

    if (!layout) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(layout);
  },

  async create(req, res) {
    if (!req.rules.is_layout_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const createdLayout = await Layout.create(req.body);

    res.status(200).send(createdLayout);
  },

  async update(req, res) {
    if (!req.rules.is_layout_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const layout = await Layout.findByPk(req.body.id);

    if (!layout) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    const updateLayout = req.body;
    delete updateLayout.id;

    const updatedLayout = await layout.update(updateLayout);

    res.status(200).send(updatedLayout);
  },

  async remove(req, res) {
    if (!req.rules.is_layout_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const layout = await Layout.findByPk(req.body.id);

    if (!layout) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    await Layout.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Success!'
    });
  },

  async count(req, res) {
    if (!req.rules.is_layouts_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const count = await Layout.count(filter);

    res.status(200).send({
      count
    });
  }
}
