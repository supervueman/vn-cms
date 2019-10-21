const mutations = {
  SET(state, payload) {
    state.resource = payload;
  },
  SET_ALL(state, payload) {
    state.resources = payload;
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
    const serializedFields = {};

    const fields = state.fields.map(el => el);
    const additionalFields = state.additionalFields.map(el => el);

    function serializedFieldsFunc(fields, additionalFields) {
      fields.forEach((el1, i) => {
        additionalFields.forEach((el2, j) => {
          if (el1.slug === el2.slug) {
            serializedFields[el1.slug] = {
              ...el2,
              interface: {
                ...el1
              }
            }

            if (el1.fieldType === 'migx') {
              serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
              serializedFields[el1.slug].value = JSON.parse(serializedFields[el2.slug].value);
            }
            if (el1.fieldType === 'select') {
              serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
            }
            if (el1.fieldType === 'multiselect') {
              serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
              serializedFields[el1.slug].value = JSON.parse(serializedFields[el2.slug].value);
            }
            if (el1.fieldType === 'radio') {
              serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
            }
            fields.splice(i, 1);
            additionalFields.splice(j, 1);
            serializedFieldsFunc(fields, additionalFields);
            return;
          }
        });
      });
    }

    if (fields.length > 0) {
      fields.forEach(el => {
        serializedFields[el.slug] = {
          slug: el.slug,
          value: el.defaultValue,
          fieldId: el.id,
          resourceId: state.resource.id,
          interface: {
            ...el
          }
        }
        if (el.fieldType === 'select') {
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
        }
        if (el.fieldType === 'migx') {
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
          serializedFields[el.slug].value = JSON.parse(el.defaultValue);
        }
        if (el.fieldType === 'multiselect') {
          serializedFields[el.slug].value = [];
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
        }
        if (el.fieldType === 'radio') {
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
        }
      });
    }

    serializedFieldsFunc(fields, additionalFields);

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
  }
};

export default mutations;
