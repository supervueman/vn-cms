// Models
const Resource = require('../models/resource');
const SystemSetting = require('../models/systemSetting');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_resources_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    if (!filter.where) {
      filter.where = {};
    }

    filter.where.userId = req.profile.id;
    if (!(req.managerAccess || req.adminAccess)) {
      filter.where.userId = req.profile.userId;
    } else if (req.adminAccess) {
      filter.where = {};
    }

    const resources = await Resource.findAll(filter);

    res.status(200).send(resources);
  },

  async findByPk(req, res) {
    if (!req.rules.is_resources_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const id = req.params.id;

    const filter = JSON.parse(req.query.filter || "{}");

    const resource = await Resource.findByPk(id, filter);

    if (!resource) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
    if (((req.managerAccess && resource.userId === req.profile.id) || req.adminAccess) || resource.userId === req.profile.userId) {
      res.status(200).send(resource);
    } else {
      res.status(403).send({
        mesasge: 'Access denied!'
      });
    }
  },

  async findOne(req, res) {
    if (!req.rules.is_resources_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const resource = await Resource.findOne(filter);

    if (!resource) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
    if (((req.managerAccess && resource.userId === req.profile.id) || req.adminAccess) || resource.userId === req.profile.userId) {
      res.status(200).send(resource);
    } else {
      res.status(403).send({
        mesasge: 'Access denied!'
      });
    }
  },

  async create(req, res) {
    if (!req.rules.is_resource_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    req.body.userId = req.profile.id;

    if (req.profile.role.slug !== 'manager') {
      req.body.userId = req.profile.userId;
    }

    const createdResource = await Resource.create(req.body);

    const is_id_in_slug = await SystemSetting.findOne({
      where: {
        slug: 'is_id_in_slug'
      }
    });

    if (is_id_in_slug.dataValues.value === 'true') {
      createdResource.dataValues.slug = `${req.body.slug}-${createdResource.dataValues.id}`;

      await createdResource.update({
        slug: createdResource.dataValues.slug
      });
    }

    const main_lang = await SystemSetting.findOne({
      where: {
        slug: 'main_lang'
      }
    });

    if (!main_lang) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    if (main_lang.dataValues.value === createdResource.lang) {

      await createdResource.update({
        translationId: createdResource.dataValues.id
      });
    }

    res.status(200).send(createdResource);
  },

  async update(req, res) {
    if (!req.rules.is_resource_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const resource = await Resource.findByPk(req.body.id, filter);

    if (!resource) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
    if (((req.managerAccess && resource.userId === req.profile.id) || req.adminAccess) || resource.userId === req.profile.userId) {
      const updateResource = req.body;

      const is_id_in_slug = await SystemSetting.findOne({
        where: {
          slug: 'is_id_in_slug'
        }
      });

      if (is_id_in_slug.value === 'true') {
        const slugId = updateResource.slug.substring(updateResource.slug.length - `${updateResource.id}`.length);

        if (`-${slugId}` !== `-${updateResource.id}`) {
          updateResource.slug = `${req.body.slug}-${updateResource.id}`;
        }
      }

      const updatedResource = await resource.update(updateResource);

      res.status(200).send(updatedResource);
    } else {
      res.status(403).send({
        message: 'Access denied!'
      })
    }
  },

  async remove(req, res) {
    if (!req.rules.is_resource_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const resource = await Resource.findByPk(req.body.id);

    if (!resource) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    // (Если это менеджер и userId ресурса совпадает с id менеджера или это админ) или (userId ресурса совпадает с userId профиля)
    if (((req.managerAccess && resource.userId === req.profile.id) || req.adminAccess) || resource.userId === req.profile.userId) {
      await Resource.destroy({
        where: {
          id: req.body.id
        }
      });
      res.status(200).send({
        message: 'Success!'
      });
    } else {
      res.status(403).send({
        message: 'Access denied!'
      });
    }
  },

  async count(req, res) {
    if (!req.rules.is_resources_read) {
      res.status(403).send({
        message: 'Access denied!'
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

  async addTranslation(req, res) {
    if (!req.rules.is_resource_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const resource = await Resource.findByPk(req.body.id);

    if (!resource) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    const newResource = await resource.addTranslation(req.body.translationId);

    res.status(200).send({
      newResource
    });
  }
}
