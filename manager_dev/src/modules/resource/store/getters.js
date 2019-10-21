const getters = {
  get(state) {
    return state.resource;
  },
  getAll(state) {
    return state.resources;
  },
  getCount(state) {
    return state.count;
  },
  getLayout(state) {
    return state.layout;
  },
  getTypes(state) {
    return state.types;
  },
  getFields(state) {
    return state.fields;
  },
  getAdditionalFields(state) {
    return state.additionalFields;
  },
  getSerializedFields(state) {
    return state.serializedFields;
  },
  getTranslations(state) {
    return state.translations;
  }
};

export default getters;
