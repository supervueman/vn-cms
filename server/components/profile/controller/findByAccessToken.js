module.exports = async (req, res) => {
  if (!req.profile) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  res.status(200).send(req.profile);
};
