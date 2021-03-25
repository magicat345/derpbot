const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });

client.on('message', msg => {
    if (msg.content === 'ping') {
    msg.channel.send('pong');
    }
    // console.log(msg);
    });

client.on('message', msg => {
    if (msg.content === 'hi botbotbot') {
    msg.channel.send('henlo' + msg.author.username);
    }
    // console.log(msg);
    });

client.login("token");