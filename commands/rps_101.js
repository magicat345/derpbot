module.exports = {
    name: 'rps101',
    description: 'pve and pvp rock, paper, scissors using the 101 item variation',
    async execute(message, args) {
        // create dictionary of item and number code
        // formula: for item number i, i wins for i+1 through i+50, loses for i+51 through i+100, tie otherwise
        // (above numbers are all mod 101)
        var dict = {
            "dynamite": 1,
            "tornado": 2,
            "quicksand": 3,
            "pit": 4,
            "chain": 5,
            "gun": 6,
            "law": 7,
            "whip": 8,
            "sword": 9,
            "rock": 10,
            "death": 11,
            "wall": 12,
            "sun": 13,
            "camera": 14,
            "fire": 15,
            "chainsaw": 16,
            "school": 17,
            "scissors": 18,
            "poison": 19,
            "cage": 20,
            "axe": 21,
            "peace": 22,
            "computer": 23,
            "castle": 24,
            "snake": 25,
            "blood": 26,
            "porcupine": 27,
            "vulture": 28,
            "monkey": 29,
            "king": 30,
            "queen": 31,
            "prince": 32,
            "princess": 33,
            "police": 34,
            "woman": 35,
            "baby": 36,
            "man": 37,
            "home": 38,
            "train": 39,
            "car": 40,
            "noise": 41,
            "bicycle": 42,
            "tree": 43,
            "turnip": 44,
            "duck": 45,
            "wolf": 46,
            "cat": 47,
            "bird": 48,
            "fish": 49,
            "spider": 50,
            "cockroach": 51,
            "brain": 52,
            "community": 53,
            "cross": 54,
            "money": 55,
            "vampire": 56,
            "sponge": 57,
            "church": 58,
            "butter": 59,
            "book": 60,
            "paper": 61,
            "cloud": 62,
            "airplane": 63,
            "moon": 64,
            "grass": 65,
            "film": 66,
            "toilet": 67,
            "air": 68,
            "planet": 69,
            "guitar": 70,
            "bowl": 71,
            "cup": 72,
            "beer": 73,
            "rain": 74,
            "water": 75,
            "television": 76,
            "rainbow": 77,
            "ufo": 78,
            "alien": 79,
            "prayer": 80,
            "mountain": 81,
            "satan": 82,
            "dragon": 83,
            "diamond": 84,
            "platinum": 85,
            "gold": 86,
            "devil": 87,
            "fence": 88,
            "video game": 89,
            "math": 90,
            "robot": 91,
            "heart": 92,
            "electricity": 93,
            "lightning": 94,
            "medusa": 95,
            "power": 96,
            "laser": 97,
            "nuke": 98,
            "sky": 99,
            "tank": 100,
            "helicopter": 101
        }

        // if user asked for help:
        if (args.length === 0 || args[0] === "help") {
            message.reply("Please ping a user to face off against or compete against me by picking a valid item.");
            return;
        } 
        // if user asked for list of items:
        else if (args[0] === "list") {
            var result = "Here is a list of valid items: ";
            for (const [key, value] of Object.entries(dict)) {
                result += `${key}, `;
            }
            message.reply(result.slice(0,result.length - 2));
            return;
        }

        // declare variables
        var user_a = message.author;
        var user_b;
        var item_a;
        var item_b;

        if (pvp) {
            // if pvp - meaning valid person is mentioned
            // aka check if message contains a mention at all - if no, error
            // if yes, check to make sure is not bot/role/everyone - if is bot, error
            // all good, initialize user_b

            /*
            per user:
            -send dm requesting item
            -receive dm
            -check if dm has valid item or not
            -if not, repeat
            */

        } else if (pve) {
            // else if pve - meaning message contains valid item
            // if no, error
        } else {
            // else error, let user know.
            message.reply("Please ping a user to face off against or compete against me by picking a valid item.");
            return;
        }

        // identify winner
        var winner;

        // check ties first
        if (dict[item_a] === dict[item_b]) {
            // end it here
            message.reply(`here's the result of your !rps101 match: It's a tie! Both ${user_a.username} `
            + `and ${user_b.username} chose ${item_b}.`);
            return;
        }

        var max_is_a = (Math.max(dict[item_a], dict[item_b]) === dist[item_a]);
        if (Math.abs(dict[item_a] - dict[item_b] > 50)) {
            if (max_is_a) {
                // a wins
                winner = 'a';
            } else {
                // b wins
                winner = 'b';
            }
        } else if (max_is_a) {
            // b wins
            winner = 'b';
        } else {
            // a wins
            winner = 'a';
        }

        var winning_item;
        var losing_item;
        var winning_user;
        if (winner === 'a') {
            winning_item = item_a;
            losing_item = item_b;
            winning_user = user_a;
        } else if (winner === 'b') {
            winning_item = item_b;
            losing_item = item_a;
            winning_user = user_b;
        }

        // send message of A:item vs B/derpbot:item, item beats item so winner wins
        message.reply(`here's the result of your !rps101 match: ${user_a.username} chose ${item_a} and ` 
            + `${user_b.username} chose ${item_b}. Since ${winning_item} beats ${losing_item}, ${winning_user.username} `
            + `is the victor! :HYPERS:`)

    }
}