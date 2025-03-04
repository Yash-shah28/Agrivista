export const isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        //redirect Url
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You must be loggedin!");
         res.redirect('/login');
    }
    next()
}

export  const saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}
