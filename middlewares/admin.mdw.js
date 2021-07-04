module.exports = function admin(req, res, next) {
  if (req.session.permission === 1) {
    next();
  }
  else {
    // req.session.retUrl = req.originalUrl;
    return res.redirect('/account/login');
  }; 
}