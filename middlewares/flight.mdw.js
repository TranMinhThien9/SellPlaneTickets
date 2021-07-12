module.exports = function (app) {
  app.use(async function (req, res, next) {
    if (typeof (req.session.match_flight) === 'undefined') {
      req.session.match_flight;
    }    
    res.locals.match_flight = req.session.match_flight;
    res.locals.flights  = req.session.flights ;
    next();
  })
};