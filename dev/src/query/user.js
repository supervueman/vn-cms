export function queryUsers(offset = 0, limit = 10, where = {}) {
  return {
    filter: {
      offset,
      limit,
      include: [{
        model: "$role"
      }],
      order: [
        ["createdAt", "DESC"]
      ],
      where
    }
  }
}
