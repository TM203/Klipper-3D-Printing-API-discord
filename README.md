# 3D Printer Discord Bot

A Discord bot that integrates with your 3D printer's Klipper firmware through the Moonraker API. It provides real-time updates on the printer's status, including when a print job starts and finishes, as well as temperature readings for the extruder and bed.

## Features

- Webcam images (optional)
- Commands (optional)
- Fetches and displays 3D printer status in Discord.
- Sends an embed message when printing starts.
- Notifies users when the print job is completed. (optional)
- Displays temperature data for the extruder and bed.
- Send Messages in the vc you are in. (optional)
- print progress notfications (optional)
- filamentrun out notfications (optional)


![printStarted](https://github.com/TM203/Klipper-3D-Printing-API-discord/blob/main/github-images/printStarted.png)




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
setup & change the config.ymal to your liking


![printprogress](https://github.com/TM203/Klipper-3D-Printing-API-discord/blob/main/github-images/printprogress.png)
![printFailed](https://github.com/TM203/Klipper-3D-Printing-API-discord/blob/main/github-images/printFailed.png)
