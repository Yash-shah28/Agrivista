import  express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import { spawn } from 'child_process';
import connectDB from './db/index.js';
import flash from 'connect-flash'
import csv from 'csv-parser'
import fs from 'fs'
import passport from 'passport';
import LocalStratergy from 'passport-local'
import ExpressError from './utils/ExpressError.js'


import userrouter from './routes/user.routes.js'
import profilerouter from './routes/profile.routes.js'
import cropYeildPredictionRouter from './routes/CropYeildPrediction.routes.js'


import User from './models/user.model.js'
import Profile from './models/profile.model.js'
import session from 'express-session'
import cropPredictionRouter from './routes/CropPrediction.routes.js';

dotenv.config({
    path: './.env'
})


const app = express();
const port = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "/public")))


const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expries: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOption));

app.use(flash());


// Setting up passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req,res) => {
    res.render('index.ejs');
  });




app.get("/simulate",(req,res)=>{
  res.render("cropvisualization")
})


app.get("/fertilizer_prediction",(req,res)=>{
  res.render('Fertilizerpredictor.ejs')
})



app.post("/fertilizerpredict",(req,res)=>{
  let {N, P, K, crop} = req.body;
  const obj = {N: N,P: P, K: K , crop: crop}
  const pythonscript = path.join(__dirname, 'utils', 'fertlizer_prediction.py');
  const childPython = spawn('python',[pythonscript, JSON.stringify(obj)]);

  childPython.stdout.on('data',(fert)=>{
  
    console.log(`stdout: ${fert}`)
    res.render('predict.ejs',{fert})
});

childPython.stderr.on('data',(fert)=>{
    console.error(`stderr: ${fert}`)
});

childPython.on('close',(code)=>{
    console.log(`Child process exited on code: ${code}`)
});

})

const fertilizerDic = {
    NHigh: `The N value of soil is high and might give rise to weeds...`,
    Nlow: `The N value of your soil is low...`,
    PHigh: `The P value of your soil is high...`,
    Plow: `The P value of your soil is low...`,
    KHigh: `The K value of your soil is high...`,
    Klow: `The K value of your soil is low...`
  };
  
  function getCropValues(cropName) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(path.join(__dirname, 'Data_csv', 'fertilizer.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const crop = results.find(row => row.Crop.toLowerCase() === cropName.toLowerCase());
          if (crop) {
            resolve({
              N: parseInt(crop.N),
              P: parseInt(crop.P),
              K: parseInt(crop.K)
            });
          } else {
            reject('Crop not found');
          }
        });
    });
  }
  
  app.post('/fertilizer-predict', async (req, res) => {
    const { crop, N, P, K } = req.body;
    try {
      const { N: nr, P: pr, K: kr } = await getCropValues(cropname);
      const N = parseInt(N);
      const P = parseInt(P);
      const K = parseInt(K);
  
      const nDiff = nr - N;
      const pDiff = pr - P;
      const kDiff = kr - K;
  
      const maxDiff = Math.max(Math.abs(nDiff), Math.abs(pDiff), Math.abs(kDiff));
  
      let key = '';
      if (Math.abs(nDiff) === maxDiff) {
        key = nDiff < 0 ? 'NHigh' : 'Nlow';
      } else if (Math.abs(pDiff) === maxDiff) {
        key = pDiff < 0 ? 'PHigh' : 'Plow';
      } else {
        key = kDiff < 0 ? 'KHigh' : 'Klow';
      }
  
      res.send(`<h1>Fertilizer Recommendation</h1><p>${fertilizerDic[key]}</p>`);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  });



app.use("/", userrouter );
app.use("/", profilerouter );
app.use("/",cropYeildPredictionRouter);
app.use("/",cropPredictionRouter)

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"))
})
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
   res.status(statusCode).render("error.ejs", {message} );

})


connectDB()
.then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
      console.log("Error : ", error);
  }
})