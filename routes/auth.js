require('../controllers/settings');
require('../controllers/message');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
   
// Lib
const sendEmail = require('../lib/email');
const {
   createActivationToken,
   getHashedPassword,
   randomText
} = require('../lib/function');
const {
   checkEmail,
   checkUsername,
   addUser
} = require('../database/function');
const {
   notAuthenticated
} = require('../lib/auth');

/*
const listkey = key_free
const randomKey = (key) => {
    const result = [];
    for (let i = 0; i < key; i++) result.listkey(pool[Math.floor(Math.random() * listkey.length)]);
    return result.join('');
}
*/

router.get('/login', notAuthenticated, (req, res) => {
   res.render('login', {
      layout: 'login'
   });
});

router.post('/login', async (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: `<div>
                  <span><b>Username or password not found</b></span>
                </div>`,
   })(req, res, next);
});

router.get('/activation/', async (req, res) => {
   let id = req.query.id;
   if (!id) {
      req.flash('error_msg', "Invalid activation token")
      res.redirect("/register");
   }

   await jwt.verify(id, activation_token, async (err, user) => {
      if (err) {
         req.flash('error_msg', "Invalid activation token")
         res.redirect("/register");
      } else {
         const {
            apikey,
            username,
            email,
            password
         } = user
         let checking = await checkUsername(username);
         let checkingEmail = await checkEmail(email);
         if (checking) {
            req.flash('error_msg', "Sorry. A user with that username already exists. Please use another username!")
            res.redirect("/signup");
         } else if (checkingEmail) {
            req.flash('error_msg', "Sorry. A user with that email address already exists. Please use another email!")
            res.redirect("/signup");
         } else {
            addUser(username, email, password, apikey);
            req.flash('success_msg', "Sign up successful. Please login to use our service.")
            res.redirect("/login");
         }
      }
   });
});
router.get('/signup', notAuthenticated, (req, res) => {
   res.render('signup', {
      layout: 'signup'
   });
});
router.post('/signup', async (req, res) => {
   try {
      let {
         email,
         username,
         password,
         password2
      } = req.body;
      if (password.length < 6 || password2 < 6) {
         req.flash('error_msg', 'Password must contain at least 6 characters');
         return res.redirect('/signup');
      }
      if (password === password2) {
         let checking = await checkUsername(username);
         let checkingEmail = await checkEmail(email);
         if (checkingEmail) {
            req.flash('error_msg', 'A user with the same Email already exists');
            return res.redirect('/signup');
         }
         if (checking) {
            req.flash('error_msg', 'A user with the same Username already exists');
            return res.redirect('/signup');
         } else {
            let hashedPassword = getHashedPassword(password);
            let apikey = randomText(10);
            const newUser = {
               apikey,
               username: username,
               email,
               password: hashedPassword
            }
            const activationToken = createActivationToken(newUser)
            const url = `https://${req.hostname}/activation?id=${activationToken}`
            await sendEmail.inboxGmailRegist(email, url);
            req.flash('success_msg', 'You are now registered, please check your email to verify your account');
            return res.redirect('/login');
         }
      } else {
         req.flash('error_msg', 'Password and Password confirmation are not the same');
         return res.redirect('/signup');
      }
   } catch (err) {
      console.log(err);
   }
})

router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success_msg', 'Logout success');
   res.redirect('/login');
});

module.exports = router