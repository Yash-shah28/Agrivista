import Profile from '../models/profile.model.js';
import axios from 'axios';

export const showCropYeildPrediction =  async (req,res) => {
    const curruser = res.locals.currentUser
    if( res.locals.currentUser){
        const allprofile = await Profile.findOne({'owner':req.user._id})
        if(!allprofile){
            req.flash("error","Profile you requested for doesnot exist!");
            res.redirect("/")
        }
        res.render('cropyieldpredict.ejs',{ allprofile, curruser })
        }
        else{
     res.render('cropyieldpredict.ejs', {curruser})
    }
}

export const resultCropYeildPrediction = async (req, res) => {
    let { Fertilizer, Pesticide, Crop, rainfall, state, season } = req.body; 
    const obj = 
    { 
        Crop: Crop, 
        Season: season, 
        State: state, 
        rainfall: rainfall, 
        Fertilizer: Fertilizer, 
        Pesticide: Pesticide 
    }

    try {
        console.log("Request body:", obj);
        const response = await axios.post('https://agrivista-ml-api.onrender.com/predict-yield', obj);
        res.render('cropyeild.ejs', { data: response.data.yield_prediction });
    } catch (error) {
        console.error('Error predicting crop yield:', error.message);
        res.status(500).send("Prediction failed.");
    }
}









