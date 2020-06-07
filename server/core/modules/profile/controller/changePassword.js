const Model = require('../../user/model');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  // Находим профиль
  const profile = await Model.findByPk(req.id);

  if (!profile) {
    logger('error', 'profile', 404, 'changePassword.js');
    sendRes({ res, status: 404 });
  }

  // Сверяем пароли
  const isCompare = await bcrypt.compare(
    req.body.oldPassword,
    profile.password
  );

  if (!isCompare) {
    logger('error', 'profile', 401, 'changePassword.js');
    sendRes({ res, status: 401 });
  } else {
    const hashPw = await bcrypt.hash(req.body.newPassword, 12);

    await profile.update({
      password: hashPw
    });

    sendRes({ res, status: 200 });
  }
};
