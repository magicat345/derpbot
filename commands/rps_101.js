module.exports = {
    name: 'rps_101',
    description: 'pve and pvp rock, paper, scissors using the 101 item variation',
    execute(message, args) {
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
            "tv": 76,
            "television": 76,
            "t.v.": 76,
            "rainbow": 77,
            "ufo": 78,
            "u.f.o.": 78,
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

        // if user asked for help/list of items:
        if (!args || args[0] === "help" || args[0] === "list") {
            message.reply(dict.toString());
            return;
        }

        // initialize variables
        var item_a;
        var item_b;

        // determine pvp or pve

        // if pvp
        // prompt users to input item choices
        // receive item choices (DMs?)

        // if pve
        // prompt user to input item (if they didn't already?)
        // randomly select item

        // identify winner

        // check ties first
        if (dict[item_a] === dict[item_b]) return // tie

        var max_is_a = (Math.max(dict[item_a], dict[item_b]) === dist[item_a]);
        if (Math.abs(dict[item_a] - dict[item_b] > 50)) {
            if (max_is_a) {
                // a wins
            } else {
                // b wins
            }
        } else if (max_is_a) {
            // b wins
        } else {
            // a wins
        }

        // send message of A:item vs B/derpbot:item, item beats item so winner wins

    }
}