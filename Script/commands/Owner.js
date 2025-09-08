const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : 𝐍𝐤 𝐍𝐚𝐢𝐞𝐦 𝐊𝐡𝐚𝐧
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : 𝐍𝐚𝐢𝐞𝐦
║ 🎂 𝗔𝗴𝗲 : 𝟭𝟴+
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : 𝗛𝗦𝗖
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : Dhaka
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║ https://www.facebook.com/nk.naiem.khan.641816
║ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 :
║ https://m.me/nk.naiem.khan.641816
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :
║ wa.me/01908143017
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
║ t.me/@Naiem220
╚═════════════════════ ✿
`;

  const images = [
    "https://i.imgur.com/PdXd4qf.jpeg",
    "https://i.imgur.com/PdXd4qf.jpeg",
    "https://i.imgur.com/PdXd4qf.jpeg",
    "https://i.imgur.com/PdXd4qf.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
