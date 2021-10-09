//console.log('server');
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
//var fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//import fetch from "node-fetch";
//import fetch from 'cross-fetch';


const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use(express.static('dist'))

const PORT = 8084
app.get('/', function (req, res) {
     //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})


app.get('/api', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async function(req, res) {
    const apiKey = process.env.API_KEY
    console.log(`Your API key is ${apiKey}`);
    const Input = req.body.url;
    console.log(`You entered: ${Input}`);
    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${Input}&lang=en`

    const response = await fetch(apiURL)
    const Data = await response.json()
    console.log(Data)
    res.send(Data)
    /*  const projectData = { //send sepsefic data
        text: '',
        score_tag : '',
        agreement : '',
        subjectivity : '',
        confidence : '',
        irony : ''
      }
      res.send(projectData);*/
     
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})



