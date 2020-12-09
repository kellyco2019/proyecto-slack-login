module.exports = (app, passport) => {

    app.get("/", (req , res) => {
        res.render ("index");

    });

    app.get("/login", (req , res) => {
        res.render ("login", {
            message: req.flash('loginMessage')
        });
});
    app.post("/login", passport.authenticated("local-login", {
        succesRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));
   

    app.get("/singup", (req , res) => {
        res.render ("singup", {
            message: req.flash('signupMessage')
        });
});

    app.post("/signup", passport.authenticate("local-signup", {
        succesRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.get("./profile", (req , res) => {
        res.render("profile", {
            user: req.user
        } )
    })
    
};
    app.get("./logout", (req , res, next) => {
    req.logout();
    res.redirect ("/");

});

function isLoggedIn (req , res , next ) {
    if (req.isAutenticated()) {
        return next();

    }
    return res.redirect("/");

}