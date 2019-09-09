export function queryLayouts(offset, limit, where = {}) {
  return {
    filter: {
      offset,
      limit,
      order: [
        ["createdAt", "DESC"]
      ],
      where
    }
  }
}
