function isAuthenticated(req, res, next) {
  console.log('SESSION:', req.session);
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

function isAdmin(req, res, next) {
  if (req.session.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access only' });
}

module.exports = { isAuthenticated, isAdmin };
