module.exports = {
	name: 'update_slots_lb',
	description: 'automatically updates scores on the slot leaderboard',
	execute(message, args) {

		var lb_channel = message.client.channels.cache.find(channel => channel.id === ("825918595904438342"));
		
		// finds user from fake mention
        var start = message.content.indexOf('@');
        var end = message.content.indexOf(' ', start);
        var winner_name = message.content.substring(start+1, end);
        var winner = message.client.users.cache.find(user => user.username === winner_name);

        var lb_msg;
        var count_index;
        var slots_lb_text;

        lb_channel.messages.fetch("826263878706003998")
            .then(msg => {
                lb_msg = msg;

                slots_lb_text = lb_msg.content.split(' ');
                
				if (winner === undefined) {
					message.reply("Only valid members of this discord (referred to by their discord tags) can have their score tracked.");
				}
				
                // if user already has score
                else if (lb_msg.content.includes(winner.id.toString())) {
                    // find user score in lb
                    count_index = 1 + slots_lb_text.findIndex((element) => element.toString().includes(winner.id.toString()));

                    // add one to score
                    slots_lb_text[count_index] = (parseInt(slots_lb_text[count_index]) + 1).toString();

                    // check for change in order
                    while (count_index > 4 && slots_lb_text[count_index]>slots_lb_text[count_index-2]) {
                        let temp_user = slots_lb_text[count_index-3];
                        let temp_score = slots_lb_text[count_index-2];
                        slots_lb_text[count_index-3] = slots_lb_text[count_index-1];
                        slots_lb_text[count_index-2] = slots_lb_text[count_index];
                        slots_lb_text[count_index-1] = temp_user;
                        slots_lb_text[count_index] = temp_score;
                        count_index -= 2;
                    }

                    // edit leaderboard
                    lb_msg.edit(slots_lb_text.join(' '));

                } else {
                    // add user and score of 1 to end of lb_msg
                    lb_msg.edit(lb_msg.content + ' \n<@' + winner.id.toString() + '> 1');
                }

            })
            .catch(console.error);

	},
};