module.exports = function admin(req, res, next) {
  if (req.session.permission === 0) {
    // req.session.retUrl = req.originalUrl;
    return res.redirect('/account/login');
  }  
  next();
}