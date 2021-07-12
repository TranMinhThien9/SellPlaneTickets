module.exports = function (app) {
  app.use(async function (req, res, next) {
    if (typeof (req.session.match_ticket) === 'undefined') {
      req.session.match_ticket;
    }    
    res.locals.match_ticket = req.session.match_ticket;
    res.locals.tickets  = req.session.tickets ;
    next();
  })
};