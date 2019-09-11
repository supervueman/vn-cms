// Handlers
const readDir = require('../handlers/readDir');
const createDir = require('../handlers/createDir');
const removeFile = require('../handlers/removeFile');
const removeDir = require('../handlers/removeDir');

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
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    await createDir(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
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
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200).send({
      message: 'Success!'
    });
  },

  async renameDir(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async renameFile(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    res.status(200);
  },

  async removeDir(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    await removeDir(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
  },

  async removeFile(req, res) {
    if (!req.isAuth) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    await removeFile(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
  },
}
