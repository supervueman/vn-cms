import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: `#${process.env.VUE_APP_THEME_LIGHT_PRIMARY || '3f51b5'}`,
        secondary: `#${process.env.VUE_APP_THEME_LIGHT_SECONDARY || 'b0bec5'}`,
        accent: `#${process.env.VUE_APP_THEME_LIGHT_ACCENT || '8c9eff'}`,
        error: `#${process.env.VUE_APP_THEME_LIGHT_ERROR || 'b71c1c'}`,
        success: `#${process.env.VUE_APP_THEME_LIGHT_SUCCESS || 'b71c1c'}`
      }
    }
  }
});
