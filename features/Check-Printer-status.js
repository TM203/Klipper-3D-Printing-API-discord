const { isPrinterPrinting, createJobEmbed, fetchKlipperJobData } = require('../util/klipper');

module.exports = (instance, client) => {
    let wasPreviouslyPrinting = false;

    setInterval(async () => {
        const jobData = await fetchKlipperJobData(); // Fetch the job data
        const isPrinting = jobData.state.flags.printing;
        const channel = client.channels.cache.get(process.env.PRINTER_CHANNEL_ID);

        if (isPrinting) {
            // Check if it just started printing
            if (!wasPreviouslyPrinting) {
                if (channel) {
                    const embed = createJobEmbed(jobData); // Create the embed with current job data
                    channel.send({ embeds: [embed] });
                }
            }
            wasPreviouslyPrinting = true;
        } else {
            // Check if it just finished printing
            if (wasPreviouslyPrinting) {
                if (channel) {
                    channel.send('The print is complete! 🎉');
                }
            }
            wasPreviouslyPrinting = false;
        }
    }, 10000); // Check every 10 seconds
};
