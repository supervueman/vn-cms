import Vue from 'vue';

export default () => {
  const requireComponent = require.context(
    // Относительный путь до каталога компонентов
    '@/modules',
    // Обрабатывать или нет подкаталоги
    true,
    // Регулярное выражение для определения файлов базовых компонентов
    /[layout]-[A-Za-z]\w+\.(vue)$/
  );
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
};
