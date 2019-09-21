export function querySystemSettings(offset = 0, limit = 10, where = {}) {
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
