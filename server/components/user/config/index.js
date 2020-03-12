module.exports = {
  routes: [{
    base_route_name: 'users',
    route_dir_path: 'user/routes'
  }],
  associations: [{
    association_dir_path: 'user/association'
  }],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
