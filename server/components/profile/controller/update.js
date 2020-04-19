const Model = require('../../user/model');

module.exports = async (req, res) => {
  // Находим профиль
  const profile = await Model.findByPk(req.id);

  if (!profile) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  // Убираем поля которые нельзя редактировать
  const updateProfileData = req.body;
  delete updateProfileData.email;
  delete updateProfileData.password;
  delete updateProfileData.token;
  delete updateProfileData.id;
  delete updateProfileData.role;

  const updatedProfile = await profile.update(updateProfileData);

  res.status(200).send(updatedProfile);
};
