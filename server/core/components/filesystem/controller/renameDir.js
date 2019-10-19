module.exports = async (req, res) => {
  if (!req.rules.is_filesystem_directory_rename) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  res.status(200);
}
