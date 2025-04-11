const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

// Signup
// router.post('/signup', (req, res) => {
//   const { name, email, password } = req.body;
//   bcrypt.hash(password, 10, (err, hash) => {
//     db.query('INSERT INTO users (name, email, password, provider) VALUES (?, ?, ?, "local")',
//       [name, email, hash],
//       (err) => {
//         if (err) return res.redirect('/signup?error=1');
//         res.redirect('/login');
//       });
//   });
// });

router.post('/signup', async (req, res) => {
  const { name, email, password, dob, income, region, aadhar, mobile} = req.body;

  try {
    const [row] = await db.execute('SELECT * FROM users WHERE email = ? OR aadhar = ? OR mobile = ? ' , [email, aadhar, mobile]);

    if (row.length > 0) {
      return res.render('signup', { error: 'Email or Aadhar or Mobile already registered' });
    }

    // Validate Aadhar format manually too (optional)
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(aadhar)) {
      return res.render('signup', { error: 'Invalid Aadhar number format' });
    }

    if (aadhar.startsWith("0") || aadhar.startsWith("1")) {
      return res.render('signup', { error: 'Aadhar number verification failed' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, dob, income, region, aadhar, provider, mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, dob, income, region, aadhar, 'local', mobile]
    );

    // 🔥 Fetch the inserted user
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
  const newUser = rows[0];

    // const  newUser ={name, email, provider:'local'};
    req.login(newUser, (err) => {
      if (err) {
        console.error('login error after ', err);
        return res.redirect('/login');
      }
    
      req.session.save((err) => {
        if (err) {
          console.error('Session save error: ', err);
          return res.redirect('/login');
        }
        console.log('✅ Signup successful. Redirecting to dashboard...');
        res.redirect('/dashboard');
      });
    });
      
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Something went wrong' });
  }
});


// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login?error=1',
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect : '/login'
  // successRedirect: '/dashboard',
  // failureRedirect: '/login'
}), (req , res) =>{
  console.log("google Sucessfully login");
  res.redirect('/dashboard');
});

// Facebook OAuth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', {
  // successRedirect: '/dashboard',
  failureRedirect: '/login'
}), (req, res) => {
  console.log('✅ GitHub OAuth success');
  res.redirect('/dashboard');
});

module.exports = router;