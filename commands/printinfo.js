const { CommandType } = require("wokcommands");
const { fetchKlipperJobData, createJobEmbed } = require('../util/klipper');
module.exports = {
  // Required for slash commands
  description: "Get print Info",
  
  // Create a legacy and slash command
  type: CommandType.BOTH,

  // Invoked when a user runs the ping command
  callback: async (message, interaction) => {

    const Data = await fetchKlipperJobData();
    console.log(Data)

    if (Data) {
        const embed = createJobEmbed(Data);
        return { embeds: [embed] }
    } else {
        const errtext = 'Error fetching job information from Klipper.';
        return { content: errtext }
    }

    
  },
}