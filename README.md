# 3D Printer Discord Bot

A Discord bot that integrates with your 3D printer's Klipper firmware through the Moonraker API. It provides real-time updates on the printer's status, including when a print job starts and finishes, as well as temperature readings for the extruder and bed.

## Features

- Fetches and displays 3D printer status in Discord.
- Sends an embed message when printing starts.
- Notifies users when the print job is completed.
- Displays temperature data for the extruder and bed.

![botphoto](https://github.com/TM203/Klipper-3D-Printing-API-discord/blob/main/github-images/image.png)

  **3D Printer Status**
- **State:** Printing
- **Operational:** Yes
- **Printing:** Yes
- **Paused:** No
- **Error:** No
- **Bed Temperature:** Actual: **60°C** | Target: **60°C**
- **Tool 0 Temperature:** Actual: **220°C** | Target: **220°C**


## Prerequisites

- Node.js (version ^14.10.2)
- Discord account and a bot created through the Discord Developer Portal.
- Klipper firmware installed on your 3D printer with Moonraker API enabled.
- A Discord channel to send updates.

## Installation

Follow these steps to set up the bot:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/3D-Printer-Discord-Bot.git
   cd 3D-Printer-Discord-Bot


**install dep**
npm install


**eg env file**
change the env file 

DISCORD_BOT_TOKEN=your_discord_bot_token
KLIPPERAPIKEY=your_klipper_api_key
KLIPPER_BASE_URL=http://klipperpi.local
PRINTER_CHANNEL_ID=your_discord_channel_id
