const fs = require("fs");

module.exports.config = {
  name: "tag",
  version: "1.0.0",
  hasPermission: 0,
  credits: "NK Naiem Khan",
  description: "Auto mention user step by step with 1-second delay",
  commandCategory: "fun",
  usages: "tag @mention সংখ্যা",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  // mention আছে কি না চেক
  if (!event.mentions || Object.keys(event.mentions).length === 0) {
    return api.sendMessage("⚠️ দয়া করে কাকে মেনশন করবেন সেটা দিন।", event.threadID, event.messageID);
  }

  // কয়বার মেনশন করবে
  let number = parseInt(args[args.length - 1]);
  if (isNaN(number) || number <= 0) {
    return api.sendMessage("⚠️ কতবার মেনশন করতে চান সেটা লিখুন।", event.threadID, event.messageID);
  }

  // মেনশন করা ইউজার আইডি আর নাম
  const mentionID = Object.keys(event.mentions)[0];
  const mentionName = event.mentions[mentionID].replace("@", "");

  let count = 0;

  // ধাপে ধাপে 1 সেকেন্ড পর পর mention
  let interval = setInterval(() => {
    if (count >= number) {
      clearInterval(interval);
      return;
    }
    api.sendMessage(
      { body: `👉 ${mentionName}`, mentions: [{ tag: mentionName, id: mentionID }] },
      event.threadID
    );
    count++;
  }, 1000); // প্রতি 1 সেকেন্ডে একবার
};
