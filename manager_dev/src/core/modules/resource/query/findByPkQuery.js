export default (id, filter) => {
  return {
    params: {
      id
    },
    query: {
      filter: {
        include: [
          {
            association: 'layout',
            include: ['fields']
          },
          'additionalfields',
          {
            association: 'parent',
            include: ['translations']
          },
          'translations',
          'resourcetype',
          'context',
          'tags'
        ],
        ...filter
      }
    }
  };
};
