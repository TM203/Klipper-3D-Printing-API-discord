const imagePath = 'screenshots/3dPrinter.png';
const { ymal } = require("../util/yaml-read")
const fs = require('fs');
const ymalConfig = ymal();


const changebotImage = async(client) => {

    if(!ymalConfig.UpdateBotImage) return

    const imageBuffer = fs.readFileSync(imagePath);

    try {
        // Set the bot's avatar using the image
        await client.user.setAvatar(imageBuffer);
        console.log('Bot avatar updated successfully!');
    } catch (error) {
        console.error('Error updating bot avatar:', error);
    }
}

module.exports = {
    changebotImage
};