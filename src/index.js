import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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',
});





export async function askGPT() {
    console.log("meghívódott")
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "What is the capital of Budapest?" }],
            model: "gpt-3.5-turbo",
        });
        
        if (chatCompletion.choices && chatCompletion.choices[0] && chatCompletion.choices[0].message) {
            console.log(chatCompletion.choices[0].message.content);
        }
    } catch(error) {
        console.error("Error occurred:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.querySelector(".cursor-pointer");  // Assuming "cursor-pointer" is a class
    if (sendButton) {
        sendButton.addEventListener("click", askGPT);
    } else {
        console.error("Button not found!");
    }
});
