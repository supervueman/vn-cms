module.exports = {
  routes: [{
    base_route_name: 'contexts',
    route_dir_path: 'context/routes'
  }],
  associations: [{
    association_dir_path: 'context/association'
  }],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
