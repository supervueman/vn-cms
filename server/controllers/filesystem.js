// Handlers
const readDir = require('../handlers/readDir');

module.exports = {
  async getFilesystem(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    let filesystem = [];

    if (req.adminAccess) {
      filesystem = readDir('');
    } else {
      filesystem = readDir(`${req.profile.id}`);
    }

    res.status(200).send(filesystem);
  },

  async createDir(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    res.status(200);
  },

  async createFile(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Не доступно!'
      });
    }

    res.status(200);
  },

  async upload(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async renameDir(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async renameFile(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async removeDir(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async removeFile(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },
}
