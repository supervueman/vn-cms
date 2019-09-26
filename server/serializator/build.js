const Sequelize = require('sequelize');
require('dotenv').config();
const layouts = require('../data/layouts.json');

// Models
const Field = require('../models/field');
const Layout = require('../models/layout');

// Data
const fieldsData = require('../data/fields.json');
const layoutsData = require('../data/layouts.json');

// Handlers
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  logging: false
});

async function build() {
  const connect = await sequelize.sync();

  if (!connect) {
    console.log('Not connect!');
    return;
  }

  await Layout.bulkCreate(layoutsData);

  const serializedFields = fieldsData.map(el => {
    if (el.fieldType === 'migx') {
      el.defaultValue = JSON.stringify(el.defaultValue);
      el.schema = JSON.stringify(el.schema);
    }
    return el;
  });

  await Field.bulkCreate(serializedFields);
}

build();
