// Handlers
const readDir = require('../handlers/readDir');
const createDir = require('../handlers/createDir');
const removeFile = require('../handlers/removeFile');
const removeDir = require('../handlers/removeDir');

module.exports = {
  async getFilesystem(req, res) {
    if (!req.rules.is_filesystem_access) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    let filesystem = [];

    if (req.adminAccess) {
      filesystem = readDir('');
    } else if (req.managerAccess) {
      filesystem = readDir(`${req.profile.id}`);
    } else {
      filesystem = readDir(`${req.profile.userId}/${req.profile.id}`);
    }

    res.status(200).send(filesystem);
  },

  async createDir(req, res) {
    if (!req.rules.is_filesystem_directory_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    await createDir(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
  },

  async createFile(req, res) {
    if (!req.rules.is_filesystem_files_create) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200);
  },

  async upload(req, res) {
    if (!req.rules.is_filesystem_files_uploads) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200).send({
      message: 'Success!'
    });
  },

  async renameDir(req, res) {
    if (!req.rules.is_filesystem_directory_rename) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200);
  },

  async renameFile(req, res) {
    if (!req.rules.is_filesystem_files_rename) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    res.status(200);
  },

  async removeDir(req, res) {
    if (!req.rules.is_filesystem_directory_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    await removeDir(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
  },

  async removeFile(req, res) {
    if (!req.rules.is_filesystem_files_delete) {
      res.status(403).send({
        message: 'Access denied!'
      });
      return;
    }

    await removeFile(req.body.path);

    res.status(200).send({
      message: 'Success!'
    });
  },
}
