// Models
const SystemSetting = require('../models/systemSetting');

module.exports = {
  async findAll(req, res) {
    if (!req.rules.is_system_settings_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const systemSettings = await SystemSetting.findAll(filter);

    res.status(200).send(systemSettings);
  },

  async findOne(req, res) {
    if (!req.rules.is_system_settings_read) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const systemSetting = await SystemSetting.findOne(filter);

    if (!systemSetting) {
      res.status(404).send({
        message: 'Not found!'
      });
    }

    res.status(200).send(systemSetting);
  },

  async update(req, res) {
    if (!req.rules.is_system_settings_update) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    const systemSetting = await SystemSetting.findByPk(req.body.id);

    if (!systemSetting) {
      res.status(404).send({
        message: 'Not found!'
      });
      return;
    }
    const updateRole = req.body;
    delete updateRole.id;

    const updatedRole = await systemSetting.update(updateRole);

    res.status(200).send(updatedRole);
  },

  async count(req, res) {
    if (!req.rules.is_system_settings_read) {
      res.status(403).send({
        message: 'Access denied!'
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
