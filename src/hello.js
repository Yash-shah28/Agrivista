import { spawn } from 'child_process';
const rain = "100"
const obj = {N : "10", P:"100", K:"20",temperature:"50", humidity:"20", ph: "20" }
obj.rainfall = rain
console.log(obj)
const childPython = spawn('python',["./utils/crop_prediction.py", JSON.stringify(obj)])

childPython.stdout.on('data',(data)=>{
    console.log(`stdout: ${data}`)
});

childPython.stderr.on('data',(data)=>{
    console.error(`stderr: ${data}`)
});

childPython.on('close',(code)=>{
    console.log(`Child process exited on code: ${code}`)
});