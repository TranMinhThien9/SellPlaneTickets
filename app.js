const express = require('express');
require('express-async-errors');

const app = express();
// app.listen(3000);
// app.get('/login', function (req, res) {
// // Dùng để ẩn một thành phần trong 1 trang html sử dụng hide
// // Đặt khối cần ẩn vào {{#if condition}} {{/if}}
//     const show = +req.query.show || 0;
//     res.render('login', {
//         layout: false,
//         data: {visible: show !== 0}
//     });
// });
// app.use(express.json()); //For JSON requests
app.use(express.urlencoded({extended: true}));

// app.use('/admin', require('./routes/admin.route'));
app.use('/public', express.static('public'));


require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);

require('./middlewares/auth.mdw')(app);
require('./middlewares/flight.mdw')(app);
require('./middlewares/ticket.mdw')(app);

require('./middlewares/routes.mdw')(app);
require('./middlewares/error.mdw')(app);




const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})