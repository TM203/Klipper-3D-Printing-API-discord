
const { WebhookClient } = require('discord.js');

const CreateWebhock = async(channel) => {
    try {

        return channel.createWebhook({
            name: 'Chattabot',
            avatar: 'https://www.chattabot.xyz/_next/image?url=%2FdiscordChattabotPic.png&w=48&q=75',
            reason: 'Created for logging, Do not DELETE.'
        })
        
    } catch (error) {
        return false
    }

}
const DeletingMessageWebhock = async(guild, channel, messageId) => {
    try {
    let webhook = await getWebhock(guild, channel)

    const message = await webhookClient.deleteMessage(messageId);
    return message

    } catch (error) {
        return false
    }
}

const FetchingWebhock = async(guild, channel, messageId) => {
    try {
    let webhook = await getWebhock(guild, channel)

    const message = await webhook.fetchMessage(messageId);
    return message

    } catch (error) {
        return false
    }
}


const EditWebhock = async(guild, channel, messageId, messageData) => {

    try {
        let webhook = await getWebhock(guild, channel)

      
        const message = await webhook.editMessage(messageId, 
        messageData)
  
    
        return message
    } catch (ignored) {}


}

const getWebhock = async(guild, channel) => {
    try {
            
        if(!guild.members.me.permissionsIn(channel)) return false

        const webhooks = await channel.fetchWebhooks({cache: true, force: true});
        let exsists = false

        for (const webhook of webhooks){
            const { owner:id } = webhook[1]
            if(id == process.env.BOTID) {
            
                return exsists = webhook.find(wh => wh.token)
            }
        }

        return exsists
    } catch (ignored) {}

    
}



const Webhock = async(guild, channel, content) => {
    try {
        
        
       let webhook = await getWebhock(guild, channel)
      
        //create webhock
        if (!webhook) {
       
			webhook = await CreateWebhock(channel)
            console.log('store', webhook)
                
            if(webhook === false){
              return false
            }
		}
 
        let message = await webhook.send(content).catch(() => {return false});
 
        return message

    } catch (error) {
		return false;
	}
}



const ChattabotServerEditWebhock = async(messageId, id, token, content) => {

    try {
        const webhookClient = new WebhookClient({ id, token, });

      
        const message = await webhookClient.editMessage(messageId, 
        content)
  
    
        return message
    } catch (ignored) {}


}

const ChattabotServerWebhock = async(id, token, content) => {
    try {
        
        
        const webhookClient = new WebhookClient({ id, token, });

        let message = await webhookClient.send(content).catch(() => {return false});
 
        return message

    } catch (error) {
		return false;
	}
}

module.exports = {
 Webhock,
 ChattabotServerWebhock,
 ChattabotServerEditWebhock,
 EditWebhock
}

