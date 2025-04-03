let translateBtn  = document.getElementById("traslateButton");

translateBtn.addEventListener("click", async() => {
    let text = document.getElementById("inputText").value.trim();
    let targetLang = document.getElementById("targetLang").value;

    const userMessage = document.createElement("div");
    userMessage.classList.add("chat__message", "chat__message--user");
    userMessage.innerText = text;
    
   const messagesCont = document.querySelector(".chat__messages");
   messagesCont.appendChild(userMessage);
  messagesCont.scrollTop = messagesCont.scrollHeight;
  
     
});