// Helpers
const filterHandler = require('../handlers/filterHandler');

// Models
const Role = require('../models/role');

module.exports = {
  async findAll(req, res) {
    const filter = filterHandler(req.query.filter);

    const roles = await Role.findAll(filter);

    res.status(200).send(roles);
  },

  async findByPk(req, res) {
    const id = req.params.id;

    const role = await Role.findByPk(id);

    if (!role) {
      res.status(401).send({
        message: 'Политика доступа не найдена!'
      })
    }
    res.status(200).send(role);
  },

  async findOne(req, res) {
    const filter = filterHandler(req.query.filter);

    const role = await Role.findOne(filter);

    if (!role) {
      res.status(404).send({
        message: 'Политика доступа не найдена!'
      })
    }

    res.status(200).send(role);
  },

  async create(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа к созданию политики доступа!'
      });
    }

    const createdRole = await Role.create(req.body);

    res.status(200).send(createdRole);
  },

  async update(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа для редактирования!'
      });
    }

    const id = req.body.id;

    const role = await Role.findByPk(id);

    if (!role) {
      res.status(401).send({
        message: 'Не найдено!'
      });
    }

    const updateRole = req.body;
    delete updateRole.id;

    const updatedRole = await role.update(updateRole);

    res.status(200).send(updatedRole);
  },

  async remove(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа для удаления политики доступа!'
      });
    }

    await Role.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(204).send({
      message: 'Успешно удалено!'
    });
  },
}
