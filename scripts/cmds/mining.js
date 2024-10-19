 const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "mining",
    aliases: ["mine"],
    version: "1.0",
    author: "Heinel",
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Fitur penambangan"
    },
    longDescription: {
      id: "Command untuk melakukan penambangan dan mendapatkan item secara acak."
    },
    category: "game",
    guide: {
      id: `
      {pn} mining - Mulai penambangan untuk mendapatkan item secara acak.
      `
    }
  },

  onStart: async function ({ api, event }) {
    const userID = event.senderID;
    const dataPath = path.join(__dirname, 'data', 'userData.json');

    // Memastikan folder data ada
    const dirPath = path.dirname(dataPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Memastikan file data ada
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({}));
    }

    let userData = JSON.parse(fs.readFileSync(dataPath));

    // Memastikan data pengguna ada
    if (!userData[userID]) {
      userData[userID] = { inventory: [] };
    }

    const miningChance = Math.random();
    const miningItems = {
      "Gold": 0.3,    // 30% chance
      "Silver": 0.2,  // 20% chance
      "Copper": 0.5,  // 50% chance
      "Diamond": 0.05 // 5% chance
    };

    let foundItem = null;
    for (const [item, chance] of Object.entries(miningItems)) {
      if (miningChance < chance) {
        foundItem = item;
        break;
      }
    }

    if (foundItem) {
      userData[userID].inventory.push(foundItem);
      fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
      api.sendMessage(`⛏️ | Anda berhasil menambang ${foundItem}!`, event.threadID);
    } else {
      api.sendMessage("⚒️ | Tidak ada item yang ditemukan saat penambangan. Cobalah lagi nanti.", event.threadID);
    }
  }
};
