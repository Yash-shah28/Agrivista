import  express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'


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
