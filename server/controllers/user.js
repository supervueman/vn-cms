const bcrypt = require('bcrypt');

// Helpers
const removeDir = require('../handlers/removeDir');

// Models
const User = require('../models/user');

module.exports = {
	async findAll(req, res) {
		if (!req.rules.is_users_read) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const filter = JSON.parse(req.query.filter || "{}");

		if (req.managerAccess) {
			if (!filter.where) {
				filter.where = {};
			}
			filter.where.userId = req.profile.id;
		}

		const users = await User.findAll(filter);

		users.forEach(el => {
			el.token = '';
		});

		res.status(200).send(users);
	},

	async findByPk(req, res) {
		if (!req.rules.is_users_read) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const filter = JSON.parse(req.query.filter || "{}");

		const user = await User.findByPk(req.params.id, filter);

		if (!user) {
			res.status(404).send({
				message: 'Not found!'
			});
		}

		if (
			(req.managerAccess && user.userId === req.profile.id) ||
			req.adminAccess
		) {
			res.status(200).send(user);
		} else {
			res.status(403).send({
				message: 'Access denied!'
			});
		}
	},

	async findone(req, res) {
		if (!req.rules.is_users_read) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const filter = JSON.parse(req.query.filter || "{}");

		const user = await User.findOne(filter);

		if (!user) {
			res.status(404).send({
				message: 'Not found!'
			});
		}

		if (
			(req.managerAccess && user.userId === req.profile.id) ||
			req.adminAccess
		) {
			res.status(200).send(user);
		} else {
			res.status(403).send({
				message: 'Access denied!'
			});
		}
	},

	async update(req, res) {
		if (!req.rules.is_user_update) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const existUser = await User.findByPk(req.body.id);

		if (!existUser) {
			res.status(404).send({
				message: 'Not found!'
			});
		}

		const reqUser = req.body;
		delete reqUser.id;
		delete reqUser.password;
		delete reqUser.token;

		if (
			(req.managerAccess && `${existUser.userId}` === `${req.profile.uid}`) ||
			req.adminAccess
		) {
			const updatedUser = await existUser.update(reqUser);

			const filter = JSON.parse(req.query.filter || "{}");

			const user = await User.findByPk(updatedUser.id, filter);
			delete user.password;

			res.status(200).send(user);
		} else {
			res.status(404).send({
				message: 'Not found!'
			});
		}
	},

	async changePassword(req, res) {
		if (!req.rules.is_user_update) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const user = await User.findByPk(req.body.userId);

		if (!user) {
			res.status(404).send({
				message: 'Not found!'
			});
		}

		if (
			(req.managerAccess && `${user.userId}` === `${req.profile.uid}`) ||
			req.adminAccess
		) {
			const isCompare = await bcrypt.compare(
				req.body.oldPassword,
				user.password
			);

			if (!isCompare) {
				res.status(401).send({
					message: 'Пароли не совпадают!'
				});
			} else {
				const hashPw = await bcrypt.hash(req.body.newPassword, 12);

				await user.update({
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
	},

	async remove(req, res) {
		if (!req.rules.is_user_delete) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const existUser = await User.findByPk(req.body.id);

		if (!existUser) {
			res.status(404).send({
				message: 'Не найдено!'
			});
		}

		if (
			(req.managerAccess && existUser.userId === req.profile.id) ||
			req.adminAccess
		) {
			removeDir(`../files/${existUser.id}`);
			await existUser.destroy({
				where: {
					id: req.body.id
				}
			});

			res.status(200).send({
				message: 'Пользователь успешно удален!'
			});
		} else {
			res.status(404).send({
				message: 'Not found!'
			});
		}
	},

	async count(req, res) {
		if (!req.rules.is_users_read) {
			res.status(403).send({
				message: 'Access denied!'
			});
			return;
		}

		const filter = JSON.parse(req.query.filter || "{}");

		if (req.managerAccess) {
			if (!filter.where) {
				filter.where = {};
			}
			filter.where.userId = req.profile.id;
		}
		const count = await User.count(filter);

		res.status(200).send({
			count
		});
	}
};
