// Models
const Dictionary = require('../models/dictionary');

module.exports = {
  async findAll(req, res) {
    const filter = JSON.parse(req.query.filter || "{}");

    const dictionaries = await Dictionary.findAll(filter);

    res.status(200).send(dictionaries);
  },

  async findByPk(req, res) {
    const filter = JSON.parse(req.query.filter || "{}");

    const dictionary = await Dictionary.findByPk(req.params.id, filter);

    if (!dictionary) {
      res.status(404).send({
        message: 'Поле не найдено!'
      });
      return;
    }

    res.status(200).send(dictionary);
  },

  async findOne(req, res) {
    const filter = JSON.parse(req.query.filter || "{}");

    const dictionary = await Dictionary.findOne(filter);

    if (!dictionary) {
      res.status(404).send({
        message: 'Не найдено!'
      });
      return;
    }

    res.status(200).send(dictionary);
  },

  async create(req, res) {
    if (!req.adminAccess) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const existDictionary = await Dictionary.findOne({
      where: {
        lang: req.body.lang
      }
    });

    if (existDictionary) {
      res.status(401).send({
        message: 'Словарь уже существует!'
      });
    }

    const createdDictionary = await Dictionary.create(req.body);

    res.status(200).send(createdDictionary);
  },

  async update(req, res) {
    if (!req.adminAccess) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const dictionary = await Dictionary.findByPk(req.body.id);

    if (!dictionary) {
      res.status(404).send({
        message: 'Не найдено!'
      });
      return;
    }

    const updateDictionary = req.body;
    delete updateDictionary.id;

    const updatedDictionary = await dictionary.update(updateDictionary);

    res.status(200).send(updatedDictionary);
  },

  async remove(req, res) {
    if (!req.adminAccess) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const dictionary = await Dictionary.findByPk(req.body.id);

    if (!dictionary) {
      res.status(404).send({
        message: 'Не найдено!'
      });
    }

    await Dictionary.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Успешно удалено!'
    });
  },

  async count(req, res) {
    const filter = JSON.parse(req.query.filter || "{}");

    const count = await Dictionary.count(filter);

    res.status(200).send({
      count
    });
  }
}
