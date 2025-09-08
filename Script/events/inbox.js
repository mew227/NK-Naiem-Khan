module.exports.config = {
  name: "inbox",
  version: "1.0.0",
  hasPermission: 0,
  credits: "NK Naiem Khan",
  description: "Bot will reply automatically in inbox",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

// ইনবক্স মেসেজ ধরবে
module.exports.handleEvent = async function ({ api, event }) {
  if (event.isGroup == false) {
    const msg = [
      "হ্যালো ভাই 😊",
      "আমি একটা বট, ইনবক্সে সবকিছু রিপ্লাই দিতে পারি!",
      "আপনার মেসেজ আমি পেয়ে গেছি।"
    ];
    const randomMsg = msg[Math.floor(Math.random() * msg.length)];
    api.sendMessage(randomMsg, event.threadID, event.messageID);
  }
};

// কমান্ড রান হলে কিছু করবে না
module.exports.run = async function () {};
