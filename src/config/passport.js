const LocalStrategy = require ("passport-local").Strategy;

const user = require("../app/models/user");
const User = require ("../app/models/user");

module.exports = function (passport) {

    passport.serializeUser(function( user, done ) {
        done (null, user.id);
    });

    passport.desserializeUser(function( id, done ) {
        User.findById(id, function(err ,user) {
            done (err, user);
        });
    });
//singUP
    passport.use("local-singup", new LocalStrategy ({
        usernameField: "email",
        paswordFiel: "password",
        passReqToCallback: true
    }, 
    function (req, email , password , done ) {
        user.findOne ({"local emial": email}, function (err , user) {
            if (err) { return done(err);}
            if (user) {
                return done(null, false , req.flash ("signupMessage" ,"The email is already taken"));
            } else {
                var newUser = new user();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if (err) {throw err;}
                    return done (null, newUser);
                });
            } 
        })
    }));
}
//login
passport.use("local-login", new LocalStrategy ({
    usernameField: "email",
    paswordFiel: "password",
    passReqToCallback: true
}, 
function (req, email , password , done ) {
    user.findOne ({"local.emial": email}, function (err , user) {
        if (err) { return done(err);}
        if (!user) {
            return done(null, false , req.flash ("LoginMessage" ,"No user found"));
        } 
        if (!user.validatePasword(password)) {
            return done (null, false, req.flash("loginMessage", "Wrong password"));
        } 
        return done (null, user);
    })
}));

