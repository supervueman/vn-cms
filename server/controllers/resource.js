// Models
const Resource = require('../models/resource');
const ResourceType = require('../models/resourceType');
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

    if (req.managerAccess) {
      filter.where.userId = req.profile.id;
    } else if (!req.managerAccess && !req.adminAccess) {
      filter.where.userId = req.profile.userId;
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

  async findTypes(req, res) {
    if (!req.rules.is_resources_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const types = await ResourceType.findAll();

    res.status(200).send(types);
  },

  async create(req, res) {
    if (!req.rules.is_resource_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    req.body.userId = req.profile.id;
    if (!req.managerAccess && !req.adminAccess) {
      req.body.userId = req.profile.userId;
    }

    let createdResource = await Resource.create(req.body);

    const is_id_in_slug = await SystemSetting.findOne({
      where: {
        slug: 'is_id_in_slug'
      }
    });

    if (JSON.parse(is_id_in_slug.setting).value) {
      createdResource.slug = `${req.body.slug}-${createdResource.id}`;

      createdResource = await createdResource.update({
        slug: createdResource.slug
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

    if (JSON.parse(main_lang.dataValues.setting).value === createdResource.lang) {
      createdResource = await createdResource.update({
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

      if (JSON.parse(is_id_in_slug.setting).value) {
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
      filter.where.userId = req.profile.id;
    } else if (!req.managerAccess && !req.adminAccess) {
      filter.where.userId = req.profile.userId;
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
