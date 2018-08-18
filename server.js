const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// view engine beállítása expressnek
// key-value
app.set('view engine', 'hbs');

// logger
// register middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
      console.log('Unable to append to server log.')
    }
  });
  // application continues to run
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// app.use-ok aljára mert sorba hatja őket végre
// __dirname = aktuális könyvtár
// külvilág számára elérető lesz ez a könyvtár
// javascript, css, images
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// route handler
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome Here!'
  });
});

app.get('/about', (req, res) => {
  // render templates
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fill this request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Welcome Here!'
  });
});

// bind application to port
// never stop, hanging
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
