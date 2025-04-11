const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

// Local Strategy
// passport.use(new LocalStrategy({ usernameField: 'email' },
//   (email, password, done) => {
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, users) => {
//       if (err) return done(err);
//       if (!users.length) return done(null, false, { message: 'No user found' });

//       bcrypt.compare(password, users[0].password, (err, match) => {
//         if (match) return done(null, users[0]);
//         else return done(null, false, { message: 'Wrong password' });
//       });
//     });
//   }
// ));

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// 🔐 Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // or user.id if you use user id
});

// 🔓 Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  handleOAuth('google', profile, done);
}));

// Facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'emails']
}, (accessToken, refreshToken, profile, done) => {
  handleOAuth('facebook', profile, done);
}));

// GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/github/callback`
}, (accessToken, refreshToken, profile, done) => {
  handleOAuth('github', profile, done);
}));

// Shared OAuth logic
// function handleOAuth(provider, profile, done) {
//   const email = profile.emails?.[0]?.value || '';

//   if (!email) {
//     console.log(`❌ No email found for ${provider} user.`);
//     return done(null, false, { message: 'Email is required' });
//   }
//   db.query('SELECT * FROM users WHERE oauth_id = ? AND provider = ?', [profile.id, provider], (err, users) => {
//     if (err) return done(err);
//     if (users.length) return done(null, users[0]);

//     const name = profile.displayName;
//     db.query('INSERT INTO users (name, email, provider, oauth_id) VALUES (?, ?, ?, ?)', [name, email, provider, profile.id], (err, result) => {
//       if (err) return done(err);
//       db.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err, user) => {
//         return done(null, user[0]);
//       });
//     });
//   });
// }


// Shared OAuth logic
async function handleOAuth(provider, profile, done) {
  try {
    const email = profile.emails?.[0]?.value || '';
    if (!email) {
      console.log(`❌ No email found for ${provider} user.`);
      return done(null, false, { message: 'Email is required' });
    }

    // 🔍 Check if email already exists
    const [existingEmailUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingEmailUser.length > 0) {
      return done(null, existingEmailUser[0]); // Return existing user to avoid duplicate email error
    }

    // 🆕 If not found, insert new user
    const name = profile.displayName || 'Unknown User';
    const [result] = await db.execute(
      'INSERT INTO users (name, email, provider, oauth_id) VALUES (?, ?, ?, ?)',
      [name, email, provider, profile.id]
    );

    const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return done(null, user[0]);
  } catch (err) {
    console.error(`❌ Error in handleOAuth for ${provider}:`, err);
    return done(err);
  }
}
