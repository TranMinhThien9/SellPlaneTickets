const express = require('express');
// const hbs_sections = require('express-handlebars-sections');


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
// app.get('/login', function (req, res) {
//     res.sendFile(`${__dirname}/login.html`);
// })
// app.use(express.json()); //For JSON requests
app.use(express.urlencoded({extended: true}));

// app.use('/admin', require('./routes/admin.route'));
app.use('/public', express.static('public'));


require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);
// require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);
require('./middlewares/error.mdw')(app);




const PORT = 3000
app.listen(PORT, _ => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})