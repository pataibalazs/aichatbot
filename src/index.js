const submitButton = document.querySelector("#submitButton");
const messageSpace = document.querySelector("#messageSpace");
const chatbarInput = document.querySelector("#chatbarInput");
const chatButton = document.getElementById("chatButton");
const closeButton = document.getElementById("closeButton");
const chatContainer = document.getElementById("chatContainer");

chatButton.addEventListener("click", () => {
    if (chatContainer.classList.contains("hidden")) {
        chatContainer.style.animation = "popIn 0.3s forwards";
        chatContainer.classList.remove("hidden");
    } else {
        chatContainer.style.animation = "popOut 0.3s forwards";
        setTimeout(() => { 
            chatContainer.classList.add("hidden");
        }, 300);
    }
});

closeButton.addEventListener("click", () => {
    chatContainer.style.animation = "popOut 0.3s forwards";
    setTimeout(() => {
        chatContainer.classList.add("hidden");
    }, 300);
});


function createLoader() {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loader';
    loaderDiv.innerHTML = `
    <div class="flex justify-start">
    <div class="bg-slate-50 p-4 border-2 border-gray-300 rounded-xl m-4 mx-6 text-left max-w-[18rem]">
      <div class="dot-flashing mx-6"></div>
    </div>
  </div>`;

    return loaderDiv;
}

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
    messageSpace.scrollTop = messageSpace.scrollHeight;
}

export async function getMessage() {
    const userInput = document.getElementById("chatbarInput").value;
    if (userInput === '') {
        return;
    }

    document.getElementById("chatbarInput").value = '';
    insertMessage(true, userInput);
    const loader = createLoader();
    messageSpace.appendChild(loader);
    messageSpace.scrollTop = messageSpace.scrollHeight;

    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer `,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 100
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data.choices[0].message.content);
        insertMessage(false, data.choices[0].message.content);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        loader.remove();
    }
}


submitButton.addEventListener('click', getMessage)
chatbarInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getMessage();
        event.preventDefault();
    }
});







