module.exports = {
    name: 'sparkle',
    description: 'pings sparkle on occasion to give validation',
    execute(message, args) {
        message.client.channels.fetch('828757230215757874')
            .then(channel => {
                channel.send("hiya <@456291442164498444>, derpbot wishes you a good day/afternoon/evening/night ^^");
            })
            .catch(error => {
                console.error;
            })
    }
}