const axios = require('axios')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()


const apiKey = process.env.OPENAI_API_KEY

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('NodeJS API')
})

app.post('/ai', (request, response) => {
   // const prompt = "Hello, how are you today?"
    const model = "text-davinci-002"
    const { question } = request.body

    axios.post(`https://api.openai.com/v1/engines/${model}/completions`, {
        prompt: question, // Optional: specify the OpenAI engine to use. Default is "text-davinci-002" 
        max_tokens: 50,   // Optional: specify the maximum number of tokens to generate in OpenAI completion. Default is 2048
        temperature: 0.5, // Optional: specify the sampling temperature for OpenAI. Default is 0.5
        n: 1,
        stop: ""
    }, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
    })
    .then(res => {
        console.log('SUCCESS')

        if (res.data.choices) {
            response.send(res.data.choices[0].text)
            return
        }
        response.send('FAIL')

        
    })
    .catch(error => {
        response.send(res.data)
        console.error(error);
    });
})

app.listen(80, () => {
    console.log('Server is running!')
})