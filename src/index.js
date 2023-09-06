document.addEventListener('DOMContentLoaded', function () {
    console.log('Hello, World!');
});

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function runCompletion() {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "How are you today?",
        max_tokens: 4000
    });
    console.log(completion.data.choices[0].text);
}
runCompletion();