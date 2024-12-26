import  express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import { spawn } from 'child_process';



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


app.get('/', (req,res) => {
    res.render('index.ejs');
  });

app.get('/crop_prediction',(req,res)=>{
  res.render('cropprediction.ejs');
});

app.get("/simulate",(req,res)=>{
  res.render("cropvisualization")
})

app.get('/x',(req,res)=>{
  res.render('predict.ejs',{data})
})
app.get("/fertilizer_prediction",(req,res)=>{
  res.render('Fertilizerpredictor.ejs')
})

app.get("/crop_yeild_predictor",(req,res)=>{
  res.render('cropyieldpredict.ejs')
})

app.post('/predict',(req,res)=>{
  let {N,P,K,temperature,humidity,ph,rainfall} = req.body;
  // console.log(N,P,K,temperature,humidity,ph,rainfall)
  const obj = {N: N,P: P, K: K ,temperature: temperature,humidity: humidity, ph: ph,rainfall: rainfall}
  const pythonscript = "C:/Users/VICTUS/OneDrive/Desktop/Agri-git/Agrivista/src/utils/crop_presicyion.py"
  const childPython = spawn('python',[pythonscript, JSON.stringify(obj)])
  const crops = {
    rice: {
        name: "Rice",
        modelUrl: "https://sketchfab.com/models/rice",
        description: "Rice cultivation requires hot, humid conditions with plenty of water.",
    },
    maize: {
        name: "Maize",
        modelUrl: "https://sketchfab.com/models/02849731fe31486ca2eff1243455a6e9/embed",
        description: "Maize is a versatile crop that thrives in well-drained fertile soils.",
    },
    chickpea: {
        name: "Chickpea",
        embedCode: `<iframe title="Rice Field" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/rice/embed"></iframe>`,
        description: "Chickpeas are legumes that grow well in semi-arid climates.",
    },
    kidneybeans: {
        name: "Kidney Beans",
        modelUrl: "https://sketchfab.com/models/kidneybeans",
        description: "Kidney beans require warm temperatures and grow best in well-drained soils.",
    },
    pigeonpeas: {
        name: "Pigeon Peas",
        modelUrl: "https://sketchfab.com/models/pigeonpeas",
        description: "Pigeon peas are drought-resistant crops suitable for tropical climates.",
    },
    mothbeans: {
        name: "Moth Beans",
        modelUrl: "https://sketchfab.com/models/mothbeans",
        description: "Moth beans are short-duration legumes that are highly drought-resistant.",
    },
    mungbean: {
        name: "Mung Bean",
        modelUrl: "https://sketchfab.com/models/mungbean",
        description: "Mung beans are nutritious legumes that require warm growing conditions.",
    },
    blackgram: {
        name: "Black Gram",
        modelUrl: "https://sketchfab.com/models/blackgram",
        description: "Black gram thrives in hot climates and well-drained loamy soils.",
    },
    lentil: {
        name: "Lentil",
        modelUrl: "https://sketchfab.com/models/lentil",
        description: "Lentils are cool-season crops requiring moderately cool temperatures.",
    },
    pomegranate: {
        name: "Pomegranate",
        modelUrl: "https://sketchfab.com/models/pomegranate",
        description: "Pomegranates grow well in semi-arid regions with good drainage.",
    },
    banana: {
        name: "Banana",
        modelUrl: "https://sketchfab.com/models/banana",
        description: "Bananas require a tropical climate and rich, well-drained soils.",
    },
    mango: {
        name: "Mango",
        modelUrl: "https://sketchfab.com/models/mango",
        description: "Mangoes thrive in warm climates with sandy loam soils.",
    },
    grapes: {
        name: "Grapes",
        modelUrl: "https://sketchfab.com/models/grapes",
        description: "Grapes require a Mediterranean climate and well-drained soils.",
    },
    watermelon: {
        name: "Watermelon",
        modelUrl: "https://sketchfab.com/models/watermelon",
        description: "Watermelons grow well in sandy soils with high temperatures.",
    },
    muskmelon: {
        name: "Muskmelon",
        modelUrl: "https://sketchfab.com/models/muskmelon",
        description: "Muskmelons need warm, dry climates and well-drained soils.",
    },
    apple: {
        name: "Apple",
        modelUrl: "https://sketchfab.com/models/apple",
        description: "Apples require a temperate climate and well-aerated soils.",
    },
    orange: {
        name: "Orange",
        modelUrl: "https://sketchfab.com/models/orange",
        description: "Oranges thrive in tropical to subtropical climates with rich soils.",
    },
    papaya: {
        name: "Papaya",
        modelUrl: "https://sketchfab.com/models/papaya",
        description: "Papayas grow well in tropical climates with sandy, well-drained soils.",
    },
    coconut: {
        name: "Coconut",
        modelUrl: "https://sketchfab.com/models/coconut",
        description: "Coconuts need a tropical coastal environment with sandy soils.",
    },
    cotton: {
        name: "Cotton",
        modelUrl: "https://sketchfab.com/models/cotton",
        description: "Cotton grows in arid to semi-arid climates with deep, fertile soils.",
    },
    jute: {
        name: "Jute",
        modelUrl: "https://sketchfab.com/models/jute",
        description: "Jute thrives in warm, humid climates with fertile, alluvial soils.",
    },
    coffee: {
        name: "Coffee",
        modelUrl: "https://sketchfab.com/models/coffee",
        description: "Coffee requires a tropical climate with rich, well-drained soils.",
    },
};

childPython.stdout.on('data',(data)=>{
  
    console.log(`stdout: ${data}`)
    res.render('predict.ejs',{data, crops})
});

childPython.stderr.on('data',(data)=>{
    console.error(`stderr: ${data}`)
});

childPython.on('close',(code)=>{
    console.log(`Child process exited on code: ${code}`)
});

})

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  

// connectDB()
// .then(() => {
//   try {
//     app.listen(port, () => {
//       console.log(`Server running at http://localhost:${port}`);
//     });
//   } catch (error) {
//       console.log("Error : ", error);
//   }
// })
