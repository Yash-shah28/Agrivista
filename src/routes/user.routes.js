import express from 'express';
import { login,signup,saveSignup,checklogin,logout } from '../contollers/user.controller.js'
import passport from 'passport';
import { saveRedirectUrl } from '../middleware/isloggedin.middleware.js';
const userrouter  =  express.Router();


userrouter.get('/login',login)

userrouter.post('/login',saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}),checklogin)

userrouter.get('/signup',signup)


userrouter.post('/signup',saveSignup)

userrouter.get('/logout',logout)


export default userrouter;