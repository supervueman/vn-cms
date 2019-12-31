module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_files_create) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200);
};
