module.exports = {
  routes: [{
    base_route_name: 'additionalfields',
    route_dir_path: 'additionalfield/routes'
  }],
  associations: [{
    association_dir_path: 'additionalfield/association'
  }],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
