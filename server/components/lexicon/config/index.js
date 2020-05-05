module.exports = {
  routes: [
    {
      base_route_name: 'lexicons',
      route_dir_path: 'lexicon/routes'
    }
  ],
  associations: [
    {
      association_dir_path: 'lexicon/association'
    }
  ],
  swaggerPaths: ['model/index.js', 'routes/index.js']
};
