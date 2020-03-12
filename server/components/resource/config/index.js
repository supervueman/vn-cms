module.exports = {
  routes: [{
    base_route_name: 'resources',
    route_dir_path: 'resource/routes'
  }],
  associations: [{
    association_dir_path: 'resource/association'
  }],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
