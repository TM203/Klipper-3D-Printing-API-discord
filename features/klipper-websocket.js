const WebSocket = require('ws');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { ymal } = require("../util/yaml-read")
const { checkUserVC } = require("../util/check-user-voice")
const { screenshot } = require("../util/take-screenshot-webcam")
const ymalConfig = ymal()
const fs = require('fs');
const KlipperUrl = ymalConfig.KLIPPER_BASE_URL;
const KlipperIp = KlipperUrl.replace(/(^\w+:|^)\/\//, '');
const path = require('path');
let lastPrintProgressIntival = 0


const ws = new WebSocket(`ws://${KlipperIp}/websocket`);

module.exports = (instance, client) => {






const embedSend = async (text, color, extruder) => {

    
    // check if user is in vc
    const channel = client.channels.cache.get(ymalConfig.VC_Follow_Feature ? 
        await checkUserVC(client): ymalConfig.PRINTER_CHANNEL_ID, { force: true });
        
    const temp = extruder?.extruder?.temperature ? extruder?.extruder?.temperature : 'N/A'
    
    const file = new AttachmentBuilder(path.join(__dirname, '../screenshots/webcam_screenshot.jpg'));
    
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(text)
    .addFields(
        { name: 'Extruder', value: `Temperature: **${temp}**°C`, inline: true },
    )
    .setImage('attachment://webcam_screenshot.jpg');
    channel.send(
        ymalConfig.Webcam_Enabled ? 
        { embeds: [embed], files: [file] } : 
        { embeds: [embed] }
    );
}


ws.on('open', function open() {
    
    console.log('Connected to Moonraker WebSocket');
    
    const subscribeMessage = {
        jsonrpc: "2.0",
        method: "printer.objects.subscribe",
        params: {
            objects: {
                "print_stats": ["state", "filename", "total_duration", "print_duration"],
                "virtual_sdcard": ["progress"],
                "toolhead": ["position"],
                "gcode_move": ["speed_factor"],
                "extruder": ["temperature"],
                "filament_sensor": ["filament_detected"]

            }
        },
        id: 123
    };

    ws.send(JSON.stringify(subscribeMessage));
});

ws.on('message', async function incoming(data) {
    
    const message = JSON.parse(data);

    // Only process print-related notifications
    
    

    if (message.method === 'notify_status_update') {
        const params = message.params[0];
        

        
        // Handle print progress
        if (params.hasOwnProperty('virtual_sdcard') && ymalConfig.print_progress_notfications) {
            const progress = params.virtual_sdcard.progress;
            const number = (progress * 100).toFixed(2)
            
            if (number % ymalConfig.print_progress_intival === 0
                && number !== lastPrintProgressIntival) {

                lastPrintProgressIntival = number

                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                embedSend(`**${number}% complete on your print!**`, '#288cd5', params)
            }
            
        }
        

        // Handle print state changes (printing, started, complete, canceled, error)
        if (params.hasOwnProperty('print_stats')) {
            const printState = params.print_stats.state;
            const printFilename = params.print_stats.filename;



            
            
           

            if (printState === "printing" && ymalConfig.Notfications.PrintStart_notfication) {
                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                embedSend(`Print started: ${printFilename}`, '#d8ca3b', params)

            } else if (printState === "complete" && ymalConfig.Notfications.PrintComplete_notfication) {
                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                embedSend(`Print finished: ${printFilename}`, '#5bd143', params)

            } else if (printState === "cancelled" && ymalConfig.Notfications.PrintCancelled_notfication) {
                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                embedSend(`Print was cancelled: ${printFilename}`, '#e8a41d', params)



            } else if (printState === "error" && ymalConfig.Notfications.PrintError_notfication) {
                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                embedSend(`Print encountered an error: ${printFilename}`, '#d52838', params)
            }
        }

        // Handle filament run-out (if you have a filament sensor configured)
        if (params.hasOwnProperty('filament_sensor') && ymalConfig.Notfications.filamentrun_out_notfication) {
            const filamentDetected = params.filament_sensor.filament_detected;
            if (!filamentDetected) {
                // Take a screenshot if webcam enabled
                ymalConfig.Webcam_Enabled ? await screenshot() : null

                channel.send(`**Filament has run out!**`)
            }
        }
    }
});

ws.on('close', function close() {
    console.log('Disconnected from Moonraker WebSocket');
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});

}