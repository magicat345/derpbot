const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
let lb_channel;
let slots_lb_dict;
let traffic_lb_dict;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    lb_channel = client.channels.cache.find(channel => channel.name === "test-leaderboard");
    });

client.on('message', msg => {
    if (msg.content.includes("Congrats on winning absolutely nothing")) {
        var start = msg.content.indexOf('@');
        console.log(start);
        var end = msg.content.indexOf(' ', start);
        console.log(end);
        var winner_name = msg.content.substring(start+1, end);
        console.log(winner_name);
        var winner = client.users.cache.find(user => user.username === winner_name);
        console.log(winner.id);
        lb_channel.send("testing <@" + winner.id.toString() + ">");
        // find user
        // add one to score
    } else if (msg.content.includes("traffic light")) {
        // find user
        // add one to traffic lb
    }
    });

/* for deleting stuff
if (lb_channel.isText) {
        lb_channel.bulkDelete(5)
            .then(messages => console.log("success"))
            .catch(console.error);
    }
*/

client.login(config.token);