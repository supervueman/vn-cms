require('dotenv').config();

module.exports = {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_dialect: process.env.DB_DIALECT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  cors_access_url: process.env.CORS_ACCESS_URL,
  header_authorization: `Basic ${Buffer.from(process.env.AUTHORIZATION_LOGIN + ':' + process.env.AUTHORIZATION_PASSWORD).toString('base64')}`,
  server_port: process.env.SERVER_PORT
};
