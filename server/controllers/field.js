// Models
const Field = require('../models/field');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_fields_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const fields = await Field.findAll(filter);

    res.status(200).send(fields);
  },

  async findByPk(req, res) {
    if (!req.rules.is_fields_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const field = await Field.findByPk(req.params.id, filter);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(field);
  },

  async findOne(req, res) {
    if (!req.rules.is_fields_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const field = await Field.findOne(filter);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    res.status(200).send(field);
  },

  async create(req, res) {
    if (!req.rules.is_field_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const createdField = await Field.create(req.body);

    for await (layout of req.body.layouts) {
      await createdField.addLayout(layout);
    }

    res.status(200).send(createdField);
  },

  async update(req, res) {
    if (!req.rules.is_field_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    const updateField = req.body;
    delete updateField.id;

    const updatedField = await field.update(updateField);

    res.status(200).send(updatedField);
  },

  async remove(req, res) {
    if (!req.rules.is_field_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    await Field.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Success!'
    });
  },

  async count(req, res) {
    if (!req.rules.is_fields_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const count = await Field.count(filter);

    res.status(200).send({
      count
    });
  },

  async addLayout(req, res) {
    if (!req.rules.is_field_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    for await (layout of req.body.layouts) {
      await field.addLayout(layout);
    }

    const updatedField = await Field.findByPk(req.body.id, {
      include: ['layouts']
    });

    res.status(200).send(updatedField);
  },

  async removeLayout(req, res) {
    if (!req.rules.is_field_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    for await (layout of req.body.layouts) {
      await field.removeLayout(layout);
    }

    const updatedField = await Field.findByPk(req.body.id, {
      include: ['layouts']
    });

    res.status(200).send(updatedField);
  }
}
