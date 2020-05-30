const Model = require('../../user/model');

// Validators
const phoneValidator = require('../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  // Находим профиль
  const profile = await Model.findByPk(req.id).catch((err) => {
    logger('error', 'profile', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!profile) {
    logger('error', 'profile', 404, 'update.js', err);
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
  delete updateProfileData.roleId;

  const phone = phoneValidator(req.body.phone);

  if (phone) {
    updateProfileData.phone = phone;
  }

  const updatedProfile = await profile.update(updateProfileData);

  res.status(200).send(updatedProfile);
};
