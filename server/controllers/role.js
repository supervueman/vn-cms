// Models
const Role = require('../models/role');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_roles_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    if (!req.adminAccess) {
      if (!filter.where) {
        filter.where = {};
      }
      filter.where.slug = {
        $and: [{
          $ne: 'admin'
        }, {
          $ne: 'manager'
        }]
      }
    }

    const roles = await Role.findAll(filter);

    res.status(200).send(roles);
  },

  async findByPk(req, res) {
    if (!req.rules.is_roles_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }
    const id = req.params.id;

    const role = await Role.findByPk(id);

    if (!role) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    if (!req.adminAccess && (role.slug === 'admin' || role.slug === 'manager')) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200).send(role);
  },

  async findOne(req, res) {
    if (!req.rules.is_roles_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }
    const filter = JSON.parse(req.query.filter || "{}");

    const role = await Role.findOne(filter);

    if (!role) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }

    if (!req.adminAccess && (role.slug === 'admin' || role.slug === 'manager')) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200).send(role);
  },

  async create(req, res) {
    if (!req.rules.is_roles_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    if (req.body.slug === 'admin' || req.body.slug === 'manager') {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const createdRole = await Role.create(req.body);
    res.status(200).send(createdRole);
  },

  async update(req, res) {
    if (!req.rules.is_roles_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const role = await Role.findByPk(req.body.id);

    if (!role) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }
    // Если не админ и роль равна admin или manager и при этом роль не совпадает с обновленной
    // Если же админ и роль равна admin или manager и при этом роль не совпадает с обновленной
    if (!req.adminAccess && (role.slug === 'admin' || role.slug === 'manager') && role.slug !== req.body.slug) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    } else if (req.adminAccess && (role.slug === 'admin' || role.slug === 'manager') && role.slug !== req.body.slug) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const updateRole = req.body;
    delete updateRole.id;

    const updatedRole = await role.update(updateRole);

    res.status(200).send(updatedRole);
  },

  async remove(req, res) {
    if (!req.rules.is_roles_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const role = await Role.findByPk(req.body.id);

    if (role.slug === 'admin' || role.slug === 'manager') {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    await Role.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).send({
      message: 'Success remove!'
    });
  },

  async count(req, res) {
    if (!req.rules.is_roles_read) {
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
      filter.where.slug = {
        $and: [{
          $ne: 'admin'
        }, {
          $ne: 'manager'
        }]
      }
    }

    const count = await Role.count(filter);

    res.status(200).send({
      count
    });
  }
}
