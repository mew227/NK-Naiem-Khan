// Naiem.js (main runner file)
import express from "express";
import axios from "axios";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";

// Express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static index.html (for uptime monitoring)
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(chalk.green(`✅ Server running on http://localhost:${port}`));
});

// ============ BOT RUNNER SYSTEM ============

// Function to log messages nicely
function logMessage(type, msg) {
  const types = {
    info: chalk.blue("[INFO]"),
    success: chalk.green("[SUCCESS]"),
    error: chalk.red("[ERROR]"),
    warn: chalk.yellow("[WARN]")
  };
  console.log(types[type] || "[LOG]", msg);
}

// Fetch bot info from GitHub (your fork link বসাও এখানে)
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

// Function to start bot
function startBot() {
  logMessage("info", "🚀 Starting Messenger Bot...");

  // আসল বট ফাইল = Main.js (বা তুমি যেটা ব্যবহার করো)
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
