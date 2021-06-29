const express = require('express');
const exphbs  = require('express-handlebars');


const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials'
}));
app.set('view engine', 'hbs');





app.get('/', function (req, res) {
    res.render('home');
});


app.get('/login', function (req, res) {
    res.render('login', {
        layout: false
    });
});

// app.listen(3000);
app.get('/login', function (req, res) {
// Dùng để ẩn một thành phần trong 1 trang html sử dụng hide
// Đặt khối cần ẩn vào {{#if condition}} {{/if}}
    const show = +req.query.show || 0;
    res.render('login', {
        layout: false,
        data: {visible: show !== 0}
    });
});

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.get('/login', function (req, res) {
//     res.sendFile(`${__dirname}/login.html`);
// })


app.use('/admin', require('./routes/admin.route'));



const PORT = 3000
app.listen(PORT, _ => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})