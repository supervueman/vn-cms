// Models
const Field = require('../models/field');
const Layout = require('../models/layout');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const fields = await Field.findAll(filter);

    res.status(200).send(fields);
  },

  async findByPk(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const field = await Field.findByPk(req.params.id, filter);

    if (!field) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
      return;
    }

    res.status(200).send(field);
  },

  async findOne(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Не доступно!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const field = await Field.findOne(filter);

    if (!field) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
      return;
    }

    res.status(200).send(field);
  },

  async create(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
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
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Не найдено!'
      });
      return;
    }

    const updateField = req.body;
    delete updateField.id;

    const updatedField = await field.update(updateField);

    res.status(200).send(updatedField);
  },

  async remove(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
    }

    await Field.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Успешно удалено!'
    });
  },

  async count(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
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
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(401).send({
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
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const field = await Field.findByPk(req.body.id);

    if (!field) {
      res.status(401).send({
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
