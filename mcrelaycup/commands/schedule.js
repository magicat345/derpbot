module.exports = {
    name: "schedule",
    description: "takes @param team1role and @param team2role, makes a new text channel in the scheduling section for team1 and team2 to schedule their match",
    execute(message, args) {
        // make sure command was called correctly
        if (args.length < 2 || !message.mentions) {
            message.reply("Please tell me which two teams need to schedule a match together by saying "
            + "!schedule @team1 @team2. Don't forget to mention the team roles!");
            return;
        }

        // do the thing
        var team1;
        var team2;

        message.guild.roles.fetch(args[0].slice(3, args[0].length-1))
            .then(team => {
                team1 = team;
                message.guild.roles.fetch(args[1].slice(3, args[1].length-1))
                    .then(new_team => {
                        team2 = new_team;
                        // check values of teams 1 and 2
                        if (!team1 || !team2) {
                            message.reply("Please double check that you have correctly pinged two valid teams.");
                            return;
                        }

                        // make new channel with perms
                        message.guild.channels.create(`${team1.name} versus ${team2.name}`, {
                            type: 'text', 
                            // perms: organisers can do anything, team1/team2 can read/write messages
                            parent: '821485151158009897',
                            permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone.id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: team1.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                                },
                                {
                                    id: team2.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                                },
                            ],
                        })
                            .then(channel => {
                                message.reply(` the new channel ${channel.name} has been created and made visible for ${team1.name} and ${team2.name}!`);
                            })
                            .catch(error => {
                                console.error;
                                message.reply("something went wrong...");
                            });

                    })
                    .catch(error => {
                        message.reply(`${args[1]} is not a valid team, please @ the teams you want to schedule a match for.`);
                        return;
                    })
            })
            .catch(error => {
                message.reply(`${args[0]} is not a valid team, please @ the teams you want to schedule a match for.`);
                return;
            })

        } 
}