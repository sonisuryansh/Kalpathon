// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();
// require('./config/passport');

// const app = express();
// // const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.urlencoded({ extended: true }));



// const authRoutes = require('./routes/auth');
// app.use(authRoutes);

// app.get('/', (req, res) => res.redirect('/login'));

// app.get('/login', (req, res) => res.render('login'));
// app.get('/signup', (req, res) => res.render('signup'));
// app.get('/dashboard', (req, res) => {
//   if (!req.isAuthenticated()) return res.redirect('/login');
//   res.render('dashboard', { user: req.user });
// });

// app.listen(3000, () => console.log('Server running at http://localhost:3000'));




const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
app.use(authRoutes);

app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => res.render('login'));

app.get('/signup', (req, res) => res.render('signup'));

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('🚫 User not authenticated. Redirecting to login.');
    return res.redirect('/login');
  }
  console.log('✅ Authenticated user. Showing dashboard...');
  res.render('dashboard', { user: req.user });
});

// Start server
const PORT = 3000;
app.litsen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});
//app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
