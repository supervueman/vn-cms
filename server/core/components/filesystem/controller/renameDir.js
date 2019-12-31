module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_rename) {
    res.status(403).send({
      message: 'Forbidde'
    });
    return;
  }

  res.status(200).send({
    message: 'OK'
  });
};
