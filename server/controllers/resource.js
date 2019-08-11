// Helpers
const filterHandler = require('../handlers/filterHandler');

// Models
const Resource = require('../models/resource');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = filterHandler(req.query.filter);

    if (req.managerAccess) {
      if (!filter.where) {
        filter.where = {};
      }
      filter.where.userId = req.profile.id
    }

    const resources = await Resource.findAll(filter);

    const count = await Resource.count(filter);

    res.status(200).send({
      resources,
      count
    });
  },

  async findByPk(req, res) {
    if (!(req.managerAccess || req.adminAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const id = req.params.id;

    const resource = await Resource.findByPk(id);

    if (!resource) {
      res.status(404).send({
        message: 'Ресурс не найден!'
      });
      return;
    }

    if (req.managerAccess && resource.userId === req.profile.id || req.adminAccess) {
      res.status(200).send(resource);
    } else {
      res.status(401).send({
        mesasge: 'Нет доступа!'
      });
    }
  },

  async findOne(req, res) {
    if (!(req.managerAccess || req.adminAccess)) {
      res.status(401).send({
        message: 'Не доступно!'
      });
    }

    const filter = filterHandler(req.query.filter);

    const resource = await Resource.findOne(filter);

    if (!resource) {
      res.status(404).send({
        message: 'Ресурс не найден!'
      });
      return;
    }

    if (req.managerAccess && resource.userId === req.profile.id || req.adminAccess) {
      res.status(200).send(resource);
    } else {
      res.status(401).send({
        mesasge: 'Нет доступа!'
      })
    }

    res.status(200).send(resource);
  },

  async create(req, res) {
    if (!req.managerAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    req.body.userId = req.profile.id;

    const createdResource = await Resource.create(req.body);
    res.status(200).send(createdResource);
  },

  async update(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const resource = await Resource.findByPk(req.body.id);

    if (!resource) {
      res.status(401).send({
        message: 'Не найдено!'
      });
      return;
    }

    if (req.managerAccess && resource.userId === req.profile.id || req.adminAccess) {
      const updateResource = req.body;
      delete updateResource.id;

      const updatedResource = await resource.update(updateResource);

      res.status(200).send(updatedResource);
    } else {
      res.status(401).send({
        message: 'Нет доступа!'
      })
    }

  },

  async remove(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const resource = await Resource.findByPk(req.body.id);

    if (!resource) {
      res.status(404).send({
        message: 'Ресурс не найден!'
      });
    }

    if (req.managerAccess && resource.userId === req.profile.id || req.adminAccess) {
      await Resource.destroy({
        where: {
          id: req.body.id
        }
      });
      res.status(200).send({
        message: 'Успешно удалено!'
      });
    } else {
      res.status(410).send({
        message: 'Нет доступа!'
      });
    }
  },
}
