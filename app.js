const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 4000;
const homeRouter = require('./src/routers/homeRouter');
const productsRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'Assignment' }));
require('./src/config/passport.js')(app);

app.listen(port,() => {
    debug(`Listening to port ${chalk.yellow(port)}`);
});

app.set('views','./src/views');
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use("/",homeRouter);
app.use("/products",productsRouter);
app.use("/admin",adminRouter);
app.use("/auth",authRouter);