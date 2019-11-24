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
    state.fields = payload;
  },
  SET_ADDITIONAL_FIELDS(state, payload) {
    state.additionalFields = payload;
  },
  SET_SERIALIZED_FIELDS(state, payload) {
    const fields_new = {};
    state.fields.forEach(field => {
      fields_new[field.slug] = {
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

    const additionalFields_new = {};
    state.additionalFields.forEach(field => {
      additionalFields_new[field.slug] = {
        id: field.id,
        value: field.value
      };
    });

    const serializedFields_new = {};
    for (let field in fields_new) {
      serializedFields_new[field] = {
        ...fields_new[field],
        ...additionalFields_new[field]
      };

      const fieldType = serializedFields_new[field].interface.fieldType;

      if (fieldType === 'select') {
        serializedFields_new[field].interface.defaultValue = JSON.parse(serializedFields_new[field].interface.defaultValue);
      }
      if (fieldType === 'migx') {
        serializedFields_new[field].interface.defaultValue = JSON.parse(serializedFields_new[field].interface.defaultValue);

        if (serializedFields_new[field].value === '') {
          serializedFields_new[field].value = serializedFields_new[field].interface.defaultValue;
        } else {
          serializedFields_new[field].value = JSON.parse(serializedFields_new[field].value);
        }
      }
      if (fieldType === 'multiselect') {
        if (serializedFields_new[field].value === '') {
          serializedFields_new[field].value = [];
          serializedFields_new[field].interface.defaultValue = JSON.parse(serializedFields_new[field].interface.defaultValue);
        } else {
          serializedFields_new[field].value = JSON.parse(serializedFields_new[field].value);
          serializedFields_new[field].interface.defaultValue = JSON.parse(serializedFields_new[field].interface.defaultValue);
        }
      }
      if (fieldType === 'radio') {
        serializedFields_new[field].interface.defaultValue = JSON.parse(serializedFields_new[field].interface.defaultValue);
      }
    }

    state.serializedFields = serializedFields_new;
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
  }
};

export default mutations;
