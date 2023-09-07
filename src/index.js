import { CONFIG } from './config.js';

const submitButton = document.querySelector("#submitButton");
const messageSpace = document.querySelector("#messageSpace");


function insertMessage(userWrote, message) {
    switch (userWrote) {
        case true:
            var html = '<div class="flex justify-end"><div class="bg-green-200 p-4 border-2 border-gray-300 rounded-xl m-4 mx-6 text-left max-w-[18rem]">' + message + '</div></div>';
            break;
        case false:
            var html = '<div class="flex justify-start"><div class="bg-slate-50 p-4 border-2 border-gray-300 rounded-xl m-4 mx-6 text-left max-w-[18rem]">' + message + '</div></div>';
            break;
    }
    messageSpace.insertAdjacentHTML('beforeend', html);
}

export async function getMessage() {
    const userInput=document.getElementById("chatbarInput").value
    console.log(userInput)
    insertMessage(true,userInput)
    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${CONFIG.API_KEY}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data.choices[0].message.content)
        insertMessage(false,data.choices[0].message.content)



    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}

submitButton.addEventListener('click', getMessage)



