module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    

    
    app.use('/account', require('../routes/account.route'));
    app.use('/admin', require('../routes/admin.route'));
    app.use('/customer', require('../routes/customer.route'));
 

}
