// Naiem.js (All-in-One Runner File)
import express from "express";
import axios from "axios";
import { spawn } from "child_process";
import chalk from "chalk";

// Express app
const app = express();
const port = process.env.PORT || 3000;

// Serve simple HTML (uptime check)
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>NK Naiem Khan Bot</title></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 40px;">
        <h1>🤖 NK Naiem Khan Messenger Bot Running...</h1>
        <p>Server is alive at <b>http://localhost:${port}</b></p>
      </body>
    </html>
  `);
});

// Start server
app.listen(port, () => {
  console.log(chalk.green(`✅ Server running on http://localhost:${port}`));
});

// ============ BOT RUNNER SYSTEM ============

// Log helper
function logMessage(type, msg) {
  const types = {
    info: chalk.blue("[INFO]"),
    success: chalk.green("[SUCCESS]"),
    error: chalk.red("[ERROR]"),
    warn: chalk.yellow("[WARN]"),
  };
  console.log(types[type] || "[LOG]", msg);
}

// Fetch bot info from GitHub
async function fetchBotInfo() {
  try {
    const repoUrl =
      "https://raw.githubusercontent.com/NkNaiem/NK-Naiem-Khan/main/package.json";
    const { data } = await axios.get(repoUrl);
    logMessage("success", `Bot Name: ${data.name}`);
    logMessage("info", `Version: ${data.version}`);
    logMessage("info", `Description: ${data.description}`);
  } catch (err) {
    logMessage("error", "⚠️ GitHub থেকে bot info আনতে সমস্যা হয়েছে।");
  }
}

// Start Messenger Bot
function startBot() {
  logMessage("info", "🚀 Starting Messenger Bot...");

  const botProcess = spawn("node", ["Main.js"], {
    stdio: "inherit",
    shell: true,
  });

  botProcess.on("close", (code) => {
    if (code === 0) {
      logMessage("success", "✅ Bot exited normally.");
    } else {
      logMessage("error", `Bot crashed (code: ${code}). Restarting...`);
      setTimeout(startBot, 5000); // 5 সেকেন্ড পরে আবার চালাবে
    }
  });
}

// Run everything
(async () => {
  await fetchBotInfo();
  startBot();
})();
