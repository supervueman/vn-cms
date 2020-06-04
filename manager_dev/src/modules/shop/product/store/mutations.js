const mutations = {
  SET(state, payload) {
    state.product = payload;
  },
  SET_ALL(state, payload) {
    state.products = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_LAYOUT(state, payload) {
    state.layout = payload;
  },
  SET_TYPE(state, payload) {
    if (payload) {
      state.types = payload;
    }
  },
  SET_TYPES(state, payload) {
    state.types = payload;
  },
  SET_FIELDS(state, payload) {
    if (payload) {
      state.fields = payload;
    } else {
      state.fields = [];
    }
  },
  SET_ADDITIONAL_FIELDS(state, payload) {
    state.additionalFields = payload;
  },
  SET_SERIALIZED_FIELDS(state, payload) {
    const fields = {};
    state.fields.forEach(field => {
      fields[field.slug] = {
        fieldId: field.id,
        categoryId: field.categoryId,
        productId: state.product.id,
        value: '',
        interface: {
          shema: field.schema,
            id: field.id,
            defaultValue: field.defaultValue,
            fieldType: field.fieldType,
            categoryId: field.categoryId,
            title: field.title,
            slug: field.slug
        }
      };
    });

    const additionalFields = {};
    state.additionalFields.forEach(field => {
      additionalFields[field.slug] = {
        id: field.id,
        value: field.value
      };
    });

    const serializedFields = {};
    for (let field in fields) {
      serializedFields[field] = {
        ...fields[field],
        ...additionalFields[field]
      };

      const fieldType = serializedFields[field].interface.fieldType;

      if (fieldType === 'select') {
        serializedFields[field].interface.defaultValue = JSON.parse(serializedFields[field].interface.defaultValue);
      }
      if (fieldType === 'migx') {
        serializedFields[field].interface.defaultValue = JSON.parse(serializedFields[field].interface.defaultValue);

        if (serializedFields[field].value === '') {
          serializedFields[field].value = serializedFields[field].interface.defaultValue;
        } else {
          serializedFields[field].value = JSON.parse(serializedFields[field].value);
        }
      }
      if (fieldType === 'multiselect') {
        if (serializedFields[field].value === '') {
          serializedFields[field].value = [];
          serializedFields[field].interface.defaultValue = JSON.parse(serializedFields[field].interface.defaultValue);
        } else {
          serializedFields[field].value = JSON.parse(serializedFields[field].value);
          serializedFields[field].interface.defaultValue = JSON.parse(serializedFields[field].interface.defaultValue);
        }
      }
      if (fieldType === 'radio') {
        serializedFields[field].interface.defaultValue = JSON.parse(serializedFields[field].interface.defaultValue);
      }
    }

    state.serializedFields = serializedFields;
  },
  SET_TRANSLATIONS(state, payload) {
    state.translations = [{
      ...payload
    }];
    payload.translations.forEach(el => {
      state.translations.push({
        ...el
      });
    });
  },
  SET_SIDEBAR_CONTEXTS(state, payload) {
    state.sidebarContexts = payload;
  },
  INSERT_SIDEBAR_PRODUCTS(state, payload) {
    state.insertSidebarProducts = payload;
  }
};

export default mutations;
