module.exports = {
    name: 'setpoints',
    description: "mod only override of slots or traffic leaderboard",
    execute(message,args) {
        // check if user is allowed to edit leaderboard: merp, magicat, or frost
        const permittedUsers = ['208784519958888448', '505170018556706817', '691804974719434822'];
        if (!permittedUsers.includes(message.author.id)) {
            message.reply("you can't use this command");
            return;
        }
        // get lb channel
        var lb_channel = message.client.channels.cache.find(channel => channel.id === ("825918595904438342"));
        // check for all information existing in args: lb_name, user, score
        var lb_msg;
        var user;
        var score;
        // figure out which leaderboard
        if (args[0].includes('slot')) {
            // fetch lb_msg
            lb_channel.messages.fetch('826263878706003998')
                .then(msg => {
                    lb_msg = msg;
                })
                .catch(() => {
                    message.reply("oops, something went wrong while trying to access the slot leaderboard");
                    return;
                });
        } else if (args[0].includes('traffic')) {
            // fetch lb_msg
            lb_channel.messages.fetch('826267588450975840')
                .then(msg => {
                    lb_msg = msg;
                })
                .catch(() => {
                    message.reply("oops, something went wrong while trying to access the traffic leaderboard");
                    return;
                });
        } else {
            message.reply("please give me a valid leaderboard to update as the first word you type after !setpoints.");
            return;
        }
        // fetch the user
        let regex = /<@!*[0-9]+>/
        if (!regex.test(args[1])) {
            message.reply("please mention a person as the second thing you type after !setpoints.");
            return;
        } else {
            var test = args[1].slice(2, args[1].length - 1);
            if (test.startsWith('!')) {
                test = test.slice(1);
            }
            message.guild.members.fetch(test)
                .then(person => {
                    user = person;
                })
                .catch(() => {
                    message.reply("something went wrong while trying to locate this person, please make sure you've properly mentioned them");
                    return;
                }
                );
        }
        // check score is valid
        if (isNaN(args[2])) {
            message.reply("leaderboard score must be the third word after !setpoints and must be a valid number");
            return;
        }
        score = +args[2];
        if (score < 1 || !Number.isInteger(score)) {
            message.reply("only positive integers are valid scores for the leaderboard");
            return;
        }
        var score_index;
        // if user already on leaderboard, replace their score
        if (lb_msg.content.includes(user.id)) {
            // split into array by spaces
            var leaderboard = lb_msg.content.split(' ');
            // find user.id and index of it
            for (const item of leaderboard) {
                if (item.includes(user.id)) {
                    score_index = leaderboard.indexOf(item)+1;
                    leaderboard[score_index] = score;
                }
            }
        } else {
            // add user and point count to end of leaderboard 
            leaderboard.push(args[1]);
            leaderboard.push(score);
            score_index = leaderboard.length-1;
        }
        // move user to the correct spot
        while (score_index > 4 && leaderboard[score_index]>leaderboard[score_index-2]) {
            let temp_user = leaderboard[score_index-3];
            let temp_score = leaderboard[score_index-2];
            leaderboard[score_index-3] = leaderboard[score_index-1];
            leaderboard[score_index-2] = leaderboard[score_index];
            leaderboard[score_index-1] = temp_user;
            leaderboard[score_index] = temp_score;
            score_index -= 2;
        }
        while (score_index < leaderboard.length-2 && leaderboard[score_index] < leaderboard[score_index + 2]) {
            // move down/right
            let temp_user = leaderboard[score_index+1];
            let temp_score = leaderboard[score_index+2];
            leaderboard[score_index+1] = leaderboard[score_index-1];
            leaderboard[score_index+2] = leaderboard[score_index];
            leaderboard[score_index-1] = temp_user;
            leaderboard[score_index] = temp_score;
            score_index += 2;
        }
        // send message saying you did it
        message.reply("i think i did it please go check now");
    },

    async fetchinfo() {

    }

}