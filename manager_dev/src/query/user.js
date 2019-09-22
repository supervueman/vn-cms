export function queryUsers(offset = 0, limit = 10, where = {}) {
  return {
    filter: {
      offset,
      limit,
      include: ["role"],
      order: [
        ["createdAt", "DESC"]
      ],
      where
    }
  }
}
