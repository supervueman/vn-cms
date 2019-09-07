export function queryFields(offset, limit, where = {}) {
  return {
    filter: {
      offset,
      limit,
      order: [
        ["createdAt", "DESC"]
      ],
      where,
      // include: {
      //   model: '$layout'
      // }
    }
  }
}
