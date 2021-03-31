const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const update_slots_lb = require('./commands/update_slots_lb');

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

    if (msg.content.includes("Congrats on winning absolutely nothing") && msg.author.id == nightbot_id) {
        const args = true;
        const command = update_slots_lb;
    } else if (msg.content.includes("traffic light POGGERS")) {
        const args = true;
        const command = update_traffic_lb;
    } else {
        const args = msg.content.trim().trim.split(/ +/);
        const command = args.shift().toLowerCase();
    }
    
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message,args);
    } catch (err) {
        console.error(err);
        msg.reply("Oops, ping merpmerp");
    }

    });

client.login(config.token);