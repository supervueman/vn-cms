export default {
  actions: {
    async nuxtServerInit({
      commit
    }, {
      req
    }) {
      await this.dispatch("dictionary/findOne", {
        params: {
          filter: {
            where: {
              lang: 'en'
            }
          }
        }
      });
    }
  }
};
