// Models
const Resource = require('../models/resource');
const SystemSetting = require('../models/systemSetting');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    if (req.managerAccess) {
      if (!filter.where) {
        filter.where = {};
      }
      filter.where.userId = req.profile.id
    }

    const resources = await Resource.findAll(filter);

    res.status(200).send(resources);
  },

  async findByPk(req, res) {
    if (!(req.managerAccess || req.adminAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const id = req.params.id;

    const filter = JSON.parse(req.query.filter || "{}");

    const resource = await Resource.findByPk(id, filter);

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

    const filter = JSON.parse(req.query.filter || "{}");

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

    const is_id_in_slug = await SystemSetting.findOne({
      where: {
        slug: 'is_id_in_slug'
      }
    });

    if (is_id_in_slug.value) {
      createdResource.slug = `${req.body.slug}-${createdResource.id}`;

      await createdResource.update({
        slug: createdResource.slug
      });
    }

    res.status(200).send(createdResource);
  },

  async update(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const resource = await Resource.findByPk(req.body.id, filter);

    if (!resource) {
      res.status(401).send({
        message: 'Не найдено!'
      });
      return;
    }

    if (req.managerAccess && resource.userId === req.profile.id || req.adminAccess) {
      const updateResource = req.body;

      const is_id_in_slug = await SystemSetting.findOne({
        where: {
          slug: 'is_id_in_slug'
        }
      });

      if (is_id_in_slug.value) {
        const slugId = updateResource.slug.substring(updateResource.slug.length - `${updateResource.id}`.length);

        if (`-${slugId}` !== `-${updateResource.id}`) {
          updateResource.slug = `${req.body.slug}-${updateResource.id}`;
        }
      }

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

  async count(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    if (req.managerAccess) {
      if (!filter.where) {
        filter.where = {};
      }
      filter.where.userId = req.profile.id
    }

    const count = await Resource.count(filter);

    res.status(200).send({
      count
    });
  },
}
