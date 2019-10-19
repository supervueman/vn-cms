const Model = require('../model');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.userId);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
  }

  if ((req.managerAccess && String(item.userId) === String(req.profile.id)) || (!req.managerAccess && String(item.userId) === String(req.profile.userId)) || req.adminAccess) {
    const isCompare = await bcrypt.compare(
      req.body.oldPassword,
      item.password
    );

    if (!isCompare) {
      res.status(401).send({
        message: 'Пароли не совпадают!'
      });
      return;
    } else {
      const hashPw = await bcrypt.hash(req.body.newPassword, 12);

      await item.update({
        password: hashPw
      });

      res.status(200).send({
        message: 'Пароль успешно обновлен!'
      });
    }
  } else {
    res.status(404).send({
      message: 'Not found!'
    });
  }
}
