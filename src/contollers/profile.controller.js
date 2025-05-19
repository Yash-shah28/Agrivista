import Profile from '../models/profile.model.js'
import wrapAsync from '../utils/wrapAsync.js'


export const saveprofile = wrapAsync(async (req,res)=>{
    const newprofile = new Profile(req.body.profile)
    console.log(req.user)
    newprofile.owner = req.user._id;
    await newprofile.save();
    req.flash("success","Profile has been Added!")
    res.redirect('/');
})

export const addprofile = (req,res)=>{
    res.render('profile/profile.ejs')
}

export const showprofile = wrapAsync(async(req,res)=>{
    const allprofile = await Profile.findOne({'owner':req.user._id})
    .populate("owner");
    if(!allprofile){
        req.flash("error","Profile you requested for doesnot exist!");
        res.redirect("/")
    }
    res.render('profile/showprofile.ejs', { allprofile })
})

export  const editprofile = wrapAsync(async(req,res)=>{
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if(!profile){
        req.flash("error","Profile you requested for doesnot exist!");
        res.redirect("/")
    }
    res.render('profile/profileedit.ejs',{profile})
})

export const puteditprofile = wrapAsync(async(req,res)=>{
    let { id } = req.params; 
    let profile = await Profile.findByIdAndUpdate(id , {...req.body.profile});
    req.flash("success","profile Updated!")
    res.redirect('/showprofile')
})

