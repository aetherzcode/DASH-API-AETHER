// middleware/isAdmin.js
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. Admin only.');
}

module.exports = isAdmin;

