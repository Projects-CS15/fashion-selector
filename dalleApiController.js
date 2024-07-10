const OpenAi = require("openai");

const openai = new OpenAi({
    apiKey: ""
})

const imageGenerate = async() => {
    const response = openai.image.generate({
        model: "dalle",
        prompt: "a variable",
        n: 1,
        size: "number x number"
    })
    //functionality to send the response back to the server
    //res.locals = response
}