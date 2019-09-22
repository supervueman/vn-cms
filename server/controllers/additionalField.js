// Models
const AdditionalField = require('../models/additionalField');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const additionalFields = await AdditionalField.findAll(filter);

    res.status(200).send(additionalFields);
  },

  async findByPk(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const additionalField = await AdditionalField.findByPk(req.params.id, filter);

    if (!additionalField) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
      return;
    }

    res.status(200).send(additionalField);
  },

  async findOne(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Не доступно!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const additionalField = await AdditionalField.findOne(filter);

    if (!additionalField) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
      return;
    }

    res.status(200).send(additionalField);
  },

  async create(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const createdAdditionalField = await AdditionalField.create(req.body);

    res.status(200).send(createdAdditionalField);
  },

  async update(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const additionalField = await AdditionalField.findByPk(req.body.id);

    if (!additionalField) {
      res.status(404).send({
        message: 'Не найдено!'
      });
      return;
    }

    const updateAdditionalField = req.body;
    delete updateAdditionalField.id;

    const updatedAdditionalField = await additionalField.update(updateAdditionalField);

    res.status(200).send(updatedAdditionalField);
  },

  async updateAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    for (let field of req.body.fields) {
      const additionalField = await AdditionalField.findByPk(field.id);

      if (!additionalField) {
        res.status(404).send({
          message: 'Не найдено!'
        });
        return;
      }

      await additionalField.update(field);
    }

    res.status(200).send({
      message: 'All fields updated!'
    });
  },

  async remove(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const additionalField = await AdditionalField.findByPk(req.body.id);

    if (!additionalField) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
    }

    await AdditionalField.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Успешно удалено!'
    });
  }
}
