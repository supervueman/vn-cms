module.exports = {
  routes: [
    {
      base_route_name: 'tags',
      route_dir_path: 'tag/routes'
    }
  ],
  associations: [
    {
      association_dir_path: 'tag/association'
    }
  ],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
