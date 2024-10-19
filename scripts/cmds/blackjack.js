 const fs = require('fs');
const path = require('path');

// Utility function to get a random card
const getRandomCard = () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
};

// Utility function to calculate the value of a hand
const calculateHandValue = (hand) => {
  let value = 0;
  let hasAce = false;
  
  hand.forEach(card => {
    if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'A') {
      hasAce = true;
      value += 11;
    } else {
      value += parseInt(card.value);
    }
  });

  if (hasAce && value > 21) {
    value -= 10;
  }

  return value;
};

// Initialize the Blackjack command
module.exports = {
  config: {
    name: "blackjack",
    aliases: ["bj", "21"],
    version: "1.0",
    author: "Heinel",
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Permainan Blackjack sederhana"
    },
    longDescription: {
      id: "Command untuk memainkan permainan Blackjack melawan dealer."
    },
    category: "game",
    guide: {
      id: `
      {pn} blackjack start - Mulai permainan Blackjack baru
      {pn} blackjack hit - Ambil kartu tambahan
      {pn} blackjack stand - Akhiri giliran dan lihat hasil
      `
    }
  },

  onStart: async function ({ api, event, args }) {
    const userID = event.senderID;
    const dataPath = path.join(__dirname, 'data', 'blackjackData.json');

    // Ensure data folder exists
    const dirPath = path.dirname(dataPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Ensure data file exists
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({}));
    }

    let blackjackData = JSON.parse(fs.readFileSync(dataPath));

    // Ensure user data exists
    if (!blackjackData[userID]) {
      blackjackData[userID] = {
        gameActive: false,
        userHand: [],
        dealerHand: [],
        result: ""
      };
    }

    const subCommand = args[0];

    if (subCommand === "start") {
      // Start a new game
      blackjackData[userID] = {
        gameActive: true,
        userHand: [getRandomCard(), getRandomCard()],
        dealerHand: [getRandomCard(), getRandomCard()],
        result: ""
      };
      fs.writeFileSync(dataPath, JSON.stringify(blackjackData, null, 2));

      api.sendMessage("🃏 | Permainan Blackjack dimulai! Gunakan 'blackjack hit' untuk menarik kartu tambahan atau 'blackjack stand' untuk mengakhiri giliran.", event.threadID);

    } else if (subCommand === "hit") {
      if (!blackjackData[userID].gameActive) {
        return api.sendMessage("⚠️ | Anda harus memulai permainan terlebih dahulu dengan 'blackjack start'.", event.threadID);
      }

      blackjackData[userID].userHand.push(getRandomCard());
      const userValue = calculateHandValue(blackjackData[userID].userHand);
      
      if (userValue > 21) {
        blackjackData[userID].result = "❌ | Anda kalah! Nilai hand Anda melebihi 21.";
        blackjackData[userID].gameActive = false;
      }

      fs.writeFileSync(dataPath, JSON.stringify(blackjackData, null, 2));
      api.sendMessage(`🃏 | Kartu Anda ditarik. Nilai hand Anda sekarang: ${userValue}`, event.threadID);

    } else if (subCommand === "stand") {
      if (!blackjackData[userID].gameActive) {
        return api.sendMessage("⚠️ | Anda harus memulai permainan terlebih dahulu dengan 'blackjack start'.", event.threadID);
      }

      const userValue = calculateHandValue(blackjackData[userID].userHand);
      let dealerValue = calculateHandValue(blackjackData[userID].dealerHand);
      
      while (dealerValue < 17) {
        blackjackData[userID].dealerHand.push(getRandomCard());
        dealerValue = calculateHandValue(blackjackData[userID].dealerHand);
      }

      let resultMessage = `🃏 | Giliran dealer selesai.\nNilai hand dealer: ${dealerValue}\nNilai hand Anda: ${userValue}\n`;

      if (userValue > 21) {
        resultMessage += "❌ | Anda kalah! Nilai hand Anda melebihi 21.";
      } else if (dealerValue > 21 || userValue > dealerValue) {
        resultMessage += "✅ | Anda menang!";
      } else if (userValue < dealerValue) {
        resultMessage += "❌ | Anda kalah!";
      } else {
        resultMessage += "🔄 | Seri!";
      }

      blackjackData[userID].result = resultMessage;
      blackjackData[userID].gameActive = false;
      fs.writeFileSync(dataPath, JSON.stringify(blackjackData, null, 2));

      api.sendMessage(resultMessage, event.threadID);

    } else {
      return api.sendMessage("⚠️ | Sub-command tidak valid. Gunakan 'start' untuk memulai permainan, 'hit' untuk menarik kartu tambahan, atau 'stand' untuk mengakhiri giliran.", event.threadID);
    }
  }
};
