const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Handelbars partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}}`

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to appent to file.' + err);
    });
    console.log(log);
    next();
});

app.use((req, res) => {
    res.render('maintanance.hbs')
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page!',
        welcomeMessage: 'Hello to our wonderful home page!'
    })
});

app.get('/json', (req, res) => {
    res.send({
        name: 'Vassili',
        someThingElse: [
            'sport',
            'test',
            '' 
        ]
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Some title'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})