const express = require('express');
const app = express();
require('dotenv').config();
// const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const connection = require('./db');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const key =process.env.API_Key
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an expert baker who helps other bakers by answering their questions and converting measurements like cups or spoons into grams. Keep responses clear, concise, and easy to follow. Do not use markdown syntax; instead, use <b> HTML syntax for bold text."
  });

const methodoverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index'); // This will render the index.ejs file
});

app.post('/api/chatbot', async (req, res) => {

    const userMessage = req.body.message; // Assuming the user sends a message in the request body
    // Here you would call the Gemini API with the userMessage
    // For example:
    // const response = await callGeminiAPI(userMessage);
    // res.json(response);
    
    const response = await callGeminiAPI(userMessage);
    res.json(response);

});

app.get('/api/ingredients', (req, res) => {

    connection.query('SELECT id, name FROM ingredients', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
        // console.log(results)
    });

});

app.get('/api/measurements', (req, res) => {
    connection.query('SELECT id, size FROM measurements', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });

});

app.post('/api/convertMeasurement',(req,res)=>{
    let measurements =req.body.size;
    connection.query(`SELECT volume FROM measurements WHERE size='${measurements}'`, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        let vol = results[0].volume;
        res.send({vol});
    });
});

app.post('/api/convertIngredient',(req,res)=>{
    let ingredients =req.body.ingredient;    
    connection.query(`SELECT density FROM ingredients WHERE name='${ingredients}'`, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        const density = results[0].density;
        res.send({density});
    });


    // Weight (g)=Volume (ml)×Density (g/ml)
    // let vol=volumeFetch();
    // let density=densityFetch();
    // let volume= quantity* vol;
    // console.log(density)
    // let weight = volume*density
    // console.log(weight)
    // res.send({vol,density})
                
})


const PORT = process.env.PORT || 3000;

const axios = require('axios');

// Using Gemini API
async function callGeminiAPI(message) {
    const result = await model.generateContent(message);
    // console.log(result.response.text())
    return result.response.text();

    // try {
    //     const response = await axios.post('https://api.gemini.com/v1/chat', {
    //         message: message
    //     });
    //     return response.data; // Return the response data from the API
    // } catch (error) {
    //     console.error('Error calling Gemini API:', error);
    //     throw error; // Rethrow the error for handling in the route
    // }
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
