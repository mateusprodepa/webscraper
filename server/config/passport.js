//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local');

const jwtOptions = Object.create(null);
jwtOptions.secretOrKey = 'Id0n\'t4ctv4llyC4re';

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]'
}, (username, password, done) => {
    User.findOne({ username })
        .then((user) => {
            if(!user) {
                return done(null, false, {
                    errors: {
                        username: 'Nao foi possivel encontrar seu usuario.'
                    }
                })
            }

            if(!user.validatePassword(password)) {
                return done(null, false, {
                    errors: {
                        password: 'Suas senhas no conferem.'
                    }
                })
            }

            return done(null, user);
        })
        .catch(done);
}));