const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();


const KLIPPER_API_KEY = process.env.KLIPPERAPIKEY;
const KLIPPER_BASE_URL = process.env.KLIPPER_BASE_URL;

// data from Klipper
async function fetchKlipperJobData() {
    try {
        const response = await axios.get(`${KLIPPER_BASE_URL}/api/printer`, {
            headers: {
                'X-Api-Key': KLIPPER_API_KEY, 
            },
        });
   


        return response.data
    } catch (error) {
        console.error('Error fetching job data from Klipper:', error);
        return null;
    }
}

// Check if the printer is currently printing
async function isPrinterPrinting() {
    const jobData = await fetchKlipperJobData();
    if (jobData && jobData.state && jobData.state.flags) {
        return jobData; // Returns true if printing, otherwise false
    }
    return false; // Default to false if there was an error or data is incomplete
}

// Discord embed
function createJobEmbed(jobData) {
        const embed = new EmbedBuilder()
            .setTitle('3D Printer Status')
            .setColor(0x00AE86)
            .addFields(
                { name: 'State', value: jobData.state.text, inline: true },
                { name: 'Operational', value: jobData.state.flags.operational ? 'Yes' : 'No', inline: true },
                { name: 'Printing', value: jobData.state.flags.printing ? 'Yes' : 'No', inline: true },
                { name: 'Paused', value: jobData.state.flags.paused ? 'Yes' : 'No', inline: true },
                { name: 'Error', value: jobData.state.flags.error ? 'Yes' : 'No', inline: true },
                { name: 'Bed Temperature', value: `Actual: **${jobData.temperature.bed.actual}**°C\nTarget: **${jobData.temperature.bed.target}**°C`, inline: true },
                { name: 'Tool 0 Temperature', value: `Actual: **${jobData.temperature.tool0.actual}**°C\nTarget: **${jobData.temperature.tool0.target}**°C`, inline: true }
            )
            .setFooter({ text: 'Printer Status fetched from Moonraker API' });

    return embed;
}

// Export the functions for use in other files
module.exports = {
    fetchKlipperJobData,
    createJobEmbed,
    isPrinterPrinting
};
