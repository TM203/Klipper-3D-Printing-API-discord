
const { ymal } = require("../util/yaml-read")
const ymalConfig = ymal();
const guilds = ymalConfig.SERVERS



const checkUserVC = (client) => {
    for (const guildId of guilds) {
        const guild = client.guilds.cache.get(guildId, { force: true });
        if (!guild) continue
    
        // Check if the user is in a voice channel
        const member = guild.members.cache.get(ymalConfig.VC_Follow_USERID, { force: true });
        if (member && member.voice.channel) {
            return member.voice.channel.id;
        } else {
            console.log(`User is not in a voice channel.`);
            return ymalConfig.PRINTER_CHANNEL_ID
        }
    }
}

module.exports = {
    checkUserVC
};