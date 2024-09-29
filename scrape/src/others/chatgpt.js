const fetch = require('node-fetch')
const cheerio = require('cheerio')
async function ChatGpt(query) {
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": "https://2chat.c3r.ink/",
      "accept": "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      prompt: query,
      options: {},
      regenerate: false,
      roomId: 1002,
      uuid: Date.now(),
      systemMessage: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
      top_p: 1,
      temperature: 0.8
    })
  };

  const response = await fetch("https://chatapicn.a3r.fun/api/chat-process", requestData);
  const data = await response.text();
  // Handle the response data here
  let out = JSON.parse(data.split("\n").pop());
  return out;
}

module.exports = ChatGpt