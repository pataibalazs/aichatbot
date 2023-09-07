import { CONFIG } from './config.js';

const submitButton = document.querySelector("#submitButton");

export async function getMessage() {
    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${CONFIG.API_KEY}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Tell me a joke!" }],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data.choices[0].message.content)
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}

submitButton.addEventListener('click', getMessage)



