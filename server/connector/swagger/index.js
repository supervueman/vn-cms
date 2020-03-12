const {
	readdirSync
} = require('fs');

module.exports = () => {
	const getDirectories = source =>
		readdirSync(source, {
			withFileTypes: true
		})
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name);

	const dirs = getDirectories('./components');

	const paths = [];

	for (const el of dirs) {
		const swaggerPaths = require(`../../components/${el}/config`).swaggerPaths;

		if (swaggerPaths) {
			const transformPaths = swaggerPaths.map(elem => `./components/${el}/${elem}`);
			paths.push(...transformPaths);
		}
	}

	return paths;
};
