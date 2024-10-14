module.exports = {
config: {
name: "reactv2",
version: "1.0",
author: "Odiamus",//it's owner odiamus 
cooldown: 5,
role: 0,
shortDescription: "Autoresponds with reactions and replies",
longDescription: "Autoresponds with reactions and replies based on specific words or triggers.",
category: "media",
guide: "",
},
onStart: async ({ api, event }) => {
// Blank onStart function as per the request
},
onChat: async ({ api, event }) => {
const { body, messageID, threadID } = event;

// Reactions based on words
const emojis = {
"🫅": ["cliff", "odiamus", "upol", "Goddess", "Sonic", "Samuel ", "ntkhang", "Jin", "shahadat", "Aryan", "Zetsu", "Aesther"],
"🎀": ["jolie", "belle", "beau", "shiteru", "love", "oxygene", "fantastique"],
"😾": ["🤨", "no", "cherche", "😑"],
"😼": ["wesh", "intéressant", "haaays", "😁", "murderer ", "😆", "", "lol", "🤣"],
"😸": ["😹", "rire", "😂 ", "blague", "mdr", "hey", "laugh"],
"⏰": ["ai", "sdxl", "react", "xx", "imagine", "genimg", "xl", "flux", "p","prompt"],
"🌟": ["salut", "bonjour", "c v"],
"💝": ["ok", "cool", "bien", "super", "d'accord", "génial", "merveille"],
"👀":["qui ?", "toi"],
"💀":["😶", "😏", "crève ", "meurt ", "tué", "kill"],
"♻️":["restart", "help"],
"⛅":["matin"],
"🌤️":["soir", "midi"],
"⛈️":["foudre", "weather", "pluie"],
"🎉":["fête", "happy", "birthday"],
"🤧":["triste", "malade", "pas bien"],
"🌨️":["snow", "neige", "météo"],
"🕔":["generated", "imagination", "Answering", "image"],
"⚡":["odd", "odiamus"],
"🤖":["robot", "bot", "autobot"],
};

// Replies to specific words
const replies = {
"Bye": "A plus tard 🌸😘...",
"au-revoir": "🎀✨  bisous ",
"Odd": "quoi ☺️ ? ",
"who is you lover ?": "✨My Odiamus master 🎀👑"};

// React based on words
for (const [emoji, words] of Object.entries(emojis)) {
for (const word of words) {
if (body.toLowerCase().includes(word)) {
api.setMessageReaction(emoji, messageID, () => {}, true);
}
}
}

// Reply based on triggers
for (const [trigger, reply] of Object.entries(replies)) {
if (body.toLowerCase().includes(trigger)) {
api.sendMessage(reply, threadID, messageID);
}
}
},
};
