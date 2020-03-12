module.exports = {
  routes: [{
    base_route_name: 'fields',
    route_dir_path: 'field/routes'
  }],
  associations: [{
    association_dir_path: 'field/association'
  }],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
