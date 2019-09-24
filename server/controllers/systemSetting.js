// Models
const SystemSetting = require('../models/systemSetting');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const systemSettings = await SystemSetting.findAll(filter);

    res.status(200).send(systemSettings);
  },

  async findOne(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const systemSetting = await SystemSetting.findOne(filter);

    if (!systemSetting) {
      res.status(404).send({
        message: 'Не найдено!'
      });
    }

    res.status(200).send(systemSetting);
  },

  async update(req, res) {
    if (!req.adminAccess) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const systemSetting = await SystemSetting.findByPk(req.body.id);

    if (!systemSetting) {
      res.status(404).send({
        message: 'Не найдено!'
      });
      return;
    }
    const updateRole = req.body;
    delete updateRole.id;

    const updatedRole = await systemSetting.update(updateRole);

    res.status(200).send(updatedRole);
  },

  async count(req, res) {
    if (!req.adminAccess) {
      res.status(403).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const count = await SystemSetting.count(filter);

    res.status(200).send({
      count
    });
  }
}
