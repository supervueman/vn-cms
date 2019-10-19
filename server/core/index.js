const bodyParser = require('body-parser');
const createDir = require('../handlers/createDir');
const cors = require('./cors');

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    cors(req, res, next);
  });

  app.use('/files', express.static('../files'));

  await createDir('../files');
}
