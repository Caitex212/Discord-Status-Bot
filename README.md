# Echo: Discord Game Server Status Bot

A **Node.js Discord bot** for displaying live **game server status embeds** using **GameDig**.

* ✅ Supports **350+ game servers**
* ⚡ Fast autocomplete for game types
* 🔁 Auto-updating embeds
* 🔧 Fully configurable via `.env`
* 📈 Add as many embeds of as many servers as you like

---

## ✨ Features

* Query **any GameDig-supported server**
* Create live-updating status embeds
* Delete embeds when no longer needed
* Efficient autocomplete for large game lists

---

## 📦 Requirements

* **Node.js** v18+ (v20+ recommended)
* A **Discord bot application**
* A Discord server where you can install bots

---

## 🚀 Installation

```bash
git clone https://github.com/Caitex212/Echo_Discord-Status-Bot.git
cd Echo_Discord-Status-Bot
npm install
```

---

## 🔧 Configuration

Rename the example file:

```bash
mv .env_example .env
```

Edit `.env`:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=999999999999999999999
GUILD_ID=9999999999999999999
SERVER_STATUS_UPDATE_INTERVAL=5
```

**Environment variables:**

| Variable                        | Description               |
| ------------------------------- | ------------------------- |
| `DISCORD_TOKEN`                 | Bot token                 |
| `CLIENT_ID`                     | Application ID            |
| `GUILD_ID`                      | Server ID                 |
| `SERVER_STATUS_UPDATE_INTERVAL` | Update interval (minutes) |

---

## ▶️ Running the Bot

```bash
node .
```

---

## 🤖 Commands

### `/create_embed`

Create a server status embed in the current channel.

**Options:**

* `ip` – Server IP / hostname
* `port` – Server port
* `type` – Game type (autocomplete)


### `/delete_embed`

Delete an existing embed.

**Options:**

* `message_id` – ID of the embed message

> ⚠️ Enable **Developer Mode** in Discord to copy message IDs.

---

## ℹ️ Notes

* Supports **all GameDig servers** (350+)
* Restart the bot after changing `.env`

---

## 📜 License

LGPL-2.1 license
