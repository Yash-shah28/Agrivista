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

app.post('/predict',(req,res)=>{
  let {N,P,K,temperature,humidity,ph,rainfall} = req.body;
  // console.log(N,P,K,temperature,humidity,ph,rainfall)
  const obj = {N: N,P: P, K: K ,temperature: temperature,humidity: humidity, ph: ph,rainfall: rainfall}
  const pythonscript = "D:/Full stack Projects/Agrivista/src/utils/crop_prediction.py"
  const childPython = spawn('python',[pythonscript, JSON.stringify(obj)])

childPython.stdout.on('data',(data)=>{
    console.log(`stdout: ${data}`)
    res.send(`${data}`)
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
