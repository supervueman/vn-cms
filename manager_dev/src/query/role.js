export function queryRoles(where = {}) {
  return {
    filter: {
      order: [
        ["createdAt", "DESC"]
      ],
      where
    }
  }
}
