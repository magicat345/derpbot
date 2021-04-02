// DEPRECATED: run index.js instead, slot functionality is located in update_slots_lb.js and update_traffic_lb.js

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const nightbot_id = "83010416610906112";

var lb_channel;
var lb_msg;
let traffic_lb_dict;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    lb_channel = client.channels.cache.find(channel => channel.id === ("825918595904438342"));
    
    if (!lb_channel.isText) {
        lb_channel.bulkDelete(1)
            .then(messages => console.log("success"))
            .catch(console.error);
    }

    /*
    lb_channel.send("traffic leaderboard \n<@!716993756343042078> 22 \n<@!613719483051409419> 20 \n<@!505170018556706817> 5 \n<@!749338554559365241> 3 \n<@!600272574030544896> 2 \n<@!537421829699010570> 1 "
        + "\n<@!470428762933035030> 1 \n<@!751400049119854604> 1");   
     */   
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

        lb_channel.messages.fetch("826263878706003998")
            .then(message => {
                lb_msg = message;

                slots_lb_text = lb_msg.content.split(' ');
                
                // if user already has score
                if (lb_msg.content.includes(winner.id.toString())) {
                    // find user score in lb
                    count_index = 1 + slots_lb_text.findIndex((element) => element.toString().includes(winner.id.toString()));

                    // add one to score
                    slots_lb_text[count_index] = (parseInt(slots_lb_text[count_index]) + 1).toString();

                    // check for change in order
                    var compare_index = count_index - 2;
                    while (!isNaN(parseInt(slots_lb_text[compare_index]))) {
                        if (!( parseInt(slots_lb_text[count_index]) > parseInt(slots_lb_text[compare_index]) ) ) {
                            compare_index = compare_index+2;
                            winner_name_and_score = slots_lb_text.splice(count_index-1, 2);
                            slots_lb_text.splice(compare_index-1, 0, winner_name_and_score[0], winner_name_and_score[1]);
                            break;
                        }
                        compare_index = compare_index - 2;
                    }

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

        lb_channel.messages.fetch("826267588450975840")
            .then(message => {
                lb_msg = message;

                slots_lb_text = lb_msg.content.split(' ');
                
                // if user already has score
                if (lb_msg.content.includes(winner.id.toString())) {
                    // find user score in lb
                    count_index = 1 + slots_lb_text.findIndex((element) => element.toString().includes(winner.id.toString()));

                    // add one to score
                    slots_lb_text[count_index] = (parseInt(slots_lb_text[count_index]) + 1).toString();

                    // check for change in order
                    var compare_index = count_index - 2;
                    while (!isNaN(parseInt(slots_lb_text[compare_index]))) {
                        if (!( parseInt(slots_lb_text[count_index]) > parseInt(slots_lb_text[compare_index]) ) ) {
                            compare_index = compare_index+2;
                            winner_name_and_score = slots_lb_text.splice(count_index-1, 2);
                            slots_lb_text.splice(compare_index-1, 0, winner_name_and_score[0], winner_name_and_score[1]);
                            break;
                        }
                        compare_index = compare_index - 2;
                    }

                    // edit leaderboard
                    lb_msg.edit(slots_lb_text.join(' '));

                } else {
                    // add user and score of 1 to end of lb_msg
                    lb_msg.edit(lb_msg.content + ' \n<@' + winner.id.toString() + '> 1');
                }

            })
            .catch(console.error);

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