export function queryResources(offset, limit, where = {}) {
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
