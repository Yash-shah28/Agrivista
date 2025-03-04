import User from '../models/user.model.js'
import wrapAsync from '../utils/wrapAsync.js'

export const login = (req,res) =>{
    res.render('../views/users/login.ejs')
}

export const signup = (req,res)=>{
    res.render('../views/users/signup.ejs')
}

export  const saveSignup = wrapAsync(async (req,res) =>{
    try {
        let {username,password,email} = req.body;
    const newUser = new User({username,email});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome To Agrivista")
     res.redirect('/');
    })
    } catch (e) {
        req.flash("error",e.message)
        res.redirect('/signup')
    }
})

export const checklogin = wrapAsync (async (req,res) =>{
    req.flash("success","Welcome back to Agrivista!");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl)
})

export const logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged Out!");
        res.redirect("/listings")
    })
}
