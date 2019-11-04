module.exports = async (req, res) => {
  console.log(req.body);
  res.status(200).send({
    message: 'Success'
  });
};
