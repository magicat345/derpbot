const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const nightbot_id = "83010416610906112";

let lb_channel;
let traffic_lb_dict;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    lb_channel = client.channels.cache.find(channel => channel.name === "test-leaderboard");
    
    if (lb_channel.isText) {
        lb_channel.bulkDelete(70)
            .then(messages => console.log("success"))
            .catch(console.error);
    }
    
     lb_channel.send("test leaderboard \n<@!208784519958888448> 2 \n<@!505170018556706817> 1");   
    });

client.on('message', msg => {
    if (msg.content.includes("Congrats on winning absolutely nothing") && msg.author.id == nightbot_id) {

        // finds user from fake mention
        var start = msg.content.indexOf('@');
        var end = msg.content.indexOf(' ', start);
        var winner_name = msg.content.substring(start+1, end);
        var winner = client.users.cache.find(user => user.username === winner_name);

        var lb_msg;
        var count_index;
        var slots_lb_text;

        // mentions user
        // lb_channel.send("testing <@" + winner.id.toString() + ">");

        lb_channel.messages.fetch({limit: 1})
            .then(messages => {
                lb_msg = messages.first();

                slots_lb_text = lb_msg.content.split(' ');
                
                // if user already has score
                if (lb_msg.content.includes(winner.id.toString())) {
                    // find user score in lb
                    count_index = 1 + slots_lb_text.findIndex((element) => element.toString().includes(winner.id.toString()));

                    // add one to score
                    slots_lb_text[count_index] = (parseInt(slots_lb_text[count_index]) + 1).toString();

                    // check for change in order
                    

                    // edit leaderboard
                    lb_msg.edit(slots_lb_text.join(' '));

                } else {
                    // add user and score of 1 to end of lb_msg
                    lb_msg.edit(lb_msg.content + ' \n<@' + winner.id.toString() + '> 1');
                }

            })
            .catch(console.error);

    } else if (msg.content.includes("traffic light POGGERS")) {
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