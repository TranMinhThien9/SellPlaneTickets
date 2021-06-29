

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/login', function (req, res) {
        res.render('vwLogInSignUpForgotPassword/login', {
            layout: false
        })
    });
    app.get('/signup', function (req, res) {
        res.render('vwLogInSignUpForgotPassword/signup', {
            layout: false
        })
    });
    app.get('/forgetpassword', function (req, res) {
        res.render('vwLogInSignUpForgotPassword/forgetpassword', {
            layout: false
        })
    });


    app.get('/profile', function (req, res) {
        res.render('profile')
    });
    app.get('/test', function (req, res) {
        res.render('test')
    });
    app.get('/index', function (req, res) {
        res.render('index')
    });



    // app.use(logger('dev'));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: false }));
    // app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'public')));


    // app.use('/account', require('../routes/account.route'));
    app.use('/admin', require('../routes/admin.route'));
    // app.use('/customer', require('../routes/user.route'));
    // app.use('/auth', require('../routes/auth.route'));
    // app.use('/conference', require('../routes/conference.route'));
    // app.use('/conference-participant', require('../routes/conferenceParticipant.route'));
    // app.use('/venue', require('../routes/venue.route'));



}
