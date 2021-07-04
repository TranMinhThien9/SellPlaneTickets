module.exports = function customer(req, res, next) {
  if (req.session.isAuth === false) {
  //   req.session.retUrl = req.originalUrl;
    return res.redirect('/account/login');
  }
  next();
}