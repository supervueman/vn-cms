module.exports = {
  routes: [
    {
      base_route_name: 'filesystem',
      route_dir_path: 'filesystem/routes'
    }
  ],
  associations: [
    {
      association_dir_path: 'filesystem/association'
    }
  ],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
