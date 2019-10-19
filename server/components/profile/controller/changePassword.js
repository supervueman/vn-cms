const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const isCompare = await bcrypt.compare(req.body.oldPassword, req.profile.password);

  if (!isCompare) {
    res.status(401).send({
      message: 'Пароли не совпадают!'
    });
    return;
  } else {
    const hashPw = await bcrypt.hash(req.body.newPassword, 12);

    await req.profile.update({
      password: hashPw
    });

    res.status(200).send({
      message: 'Пароль успешно обновлен!'
    });
  }
}
