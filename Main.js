/*
=========================================
  𝐍𝐚𝐢𝐞𝐦 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 (Main File)
  Developer : Nk Naiem Khan
  Github    : https://github.com/NkNaiem
=========================================
*/

const fs = require("fs");
const login = require("fca-horizon-remake");
const chalk = require("chalk");
const gradient = require("gradient-string");

// === Global Variables === //
global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map()
});

global.data = new Object({
  threadData: new Map(),
  userData: new Map(),
  allUserID: [],
  allThreadID: []
});

global.config = require("./config.json");
global.utils = require("./utils");

// === Banner === //
const BOT_BANNER = `
███╗   ██╗ █████╗ ██╗██╗███████╗███╗   ███╗
████╗  ██║██╔══██╗██║██║██╔════╝████╗ ████║
██╔██╗ ██║███████║██║██║█████╗  ██╔████╔██║
██║╚██╗██║██╔══██║██║██║██╔══╝  ██║╚██╔╝██║
██║ ╚████║██║  ██║██║██║███████╗██║ ╚═╝ ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝     ╚═╝
`;

console.log(gradient.pastel.multiline(BOT_BANNER));
console.log(chalk.green(`🚀 Bot Name   : ${global.config.BOTNAME}`));
console.log(chalk.yellow(`👤 Developer : ${global.config.DEVELOPER}`));
console.log(chalk.magenta("---------------------------------------"));
console.log(chalk.blue("✅ Starting... Please wait..."));

// === Login System === //
let appStateFile = "appstate.json";
if (!fs.existsSync(appStateFile)) {
  console.log(chalk.red("❌ appstate.json file not found! Please login first."));
  process.exit(1);
}

const appState = JSON.parse(fs.readFileSync(appStateFile, "utf8"));

// === Messenger Bot Login === //
login({ appState }, (err, api) => {
  if (err) return console.error(chalk.red("❌ Login Error: ", err));

  global.client.api = api;

  console.log(chalk.green("✅ Login Successful!"));
  console.log(chalk.cyan("🤖 Naiem Chat Bot is now online."));

  // Load events & commands
  require("./includes/listen")(api);
});
