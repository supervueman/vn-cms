// Helpers
const filterHandler = require('../handlers/filterHandler');

// Models
const AdditionalField = require('../models/additionalField');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = filterHandler(req.query.filter);

    const additionalFields = await AdditionalField.findAll(filter);

    res.status(200).send(additionalFields);
  },

  async findByPk(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const filter = filterHandler(req.query.filter);

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
      res.status(401).send({
        message: 'Не доступно!'
      });
    }

    const filter = filterHandler(req.query.filter);

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
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const createdAdditionalField = await AdditionalField.create(req.body);

    res.status(200).send(createdAdditionalField);
  },

  async update(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const additionalField = await AdditionalField.findByPk(req.body.id);

    console.log(additionalField.id)

    if (!additionalField) {
      res.status(401).send({
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
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    // console.log(req.body.fields)

    for (let field of req.body.fields) {
      const additionalField = await AdditionalField.findByPk(field.id);
      console.log(field.id, field.value, '___1')
      console.log(additionalField.id, additionalField.value, '____2')

      if (!additionalField) {
        res.status(401).send({
          message: 'Не найдено!'
        });
        return;
      }
      // delete updateAdditionalField.id;

      const updatedAdditionalField = await additionalField.update(field);

      console.log(updatedAdditionalField.id, updatedAdditionalField.value, '____3')
    }

    res.status(200).send({
      message: 'All fields updated!'
    });
  },

  async remove(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
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
