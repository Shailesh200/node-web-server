const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('View Engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log +  '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page'
    })
});


app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to connect to the server"
    });
})

app.listen(port,() => {
    console.log(`Server is runing at ${port}`);
});