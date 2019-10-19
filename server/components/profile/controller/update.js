module.exports = async (req, res) => {
  if (!req.isAuth) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const updateProfileData = req.body;
  delete updateProfileData.password;
  delete updateProfileData.token;
  delete updateProfileData.id;
  delete updateProfileData.role;

  if (!req.profile) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  const newProfile = await req.profile.update(updateProfileData);

  res.status(200).send(newProfile);
}
