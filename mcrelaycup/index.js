const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command); 
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });
    

client.on('message', msg => {
    // define args
    // define command
    
    var args;
    var command;

    if (msg.guild.ownerID === '491596646451511307' && msg.author.id !== '821887216405184562') {
        /*if (msg.author.id === '249415458606940160') {
            command = 'salix';
        } else */if (msg.author.id === '456291442164498444' || msg.content.includes('sparkle') || msg.content.includes('456291442164498444')) {
            command = 'sparkle';
        } else {
            args = msg.content.slice(config.prefix.length).trim().split(/ +/);
            command = args.shift().toLowerCase();
        }
    }
        
    if (!client.commands.has(command)) {
        return;
    }

    try {
        client.commands.get(command).execute(msg,args);
    } catch (err) {
        console.error(err);
        msg.reply("oops, ping merpmerp");
    }

    });

client.login(config.token);