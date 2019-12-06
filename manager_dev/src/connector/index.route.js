import Vue from 'vue';
import Router from 'vue-router';

/**
 * Automatically imports all the modules and exports as a single module object
 */
// const requireModule = require.context('.', false, /\.store\.js$/);
const modules = {};
let paths = [];

const requireModule = require.context('../modules', true, /\.route\.js$/);

requireModule.keys().forEach(filename => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .replace(/(\.\/|\/\index\.route\.js)/g, '');

  modules[moduleName] = requireModule(filename).default || requireModule(filename);

  modules[moduleName].forEach(el => {
    el.componentPath = `${moduleName}/pages/${el.component}.vue`;
  });

  paths = paths.concat(modules[moduleName]);
});

/**
 * @function route
 * @param {string} path
 * @param {string} name
 * @param {component} component
 * @returns {object}
 * Функция возвращает объект роутера
 */
function route(path, name, component, componentPath) {
  return {
    path,
    name,
    component: () => import(
      `@/modules/${componentPath}`
    )
  };
}

Vue.use(Router);

const routes = paths.map(path => route(path.path, path.name, path.component, path.componentPath));

export default new Router({
  mode: 'history',
  routes
});
