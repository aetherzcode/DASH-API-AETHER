function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied');
}

function isAdminOrPremium(req, res, next) {
  if (req.user && (req.user.isAdmin || req.user.premium)) {
    return next();
  }
  res.status(403).send('Access denied. Admin or Premium users only.');
}

module.exports = { isAuthenticated, isAdmin, isAdminOrPremium };
