module.exports = (req, role) => {
  switch (role) {
    case 'admin':
      req.adminAccess = true;
      break;
    case 'manager':
      req.managerAccess = true;
      break;
    default:
      req.otherAccess = true;
      break;
  }
};
