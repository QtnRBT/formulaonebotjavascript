const fs = require('fs');
const request = require('request');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "reveal",
    usage: "$reveal",
    description: "Allows the admins to reveal the winner(s) and thus end the bets.",
    admin: true,
    execute(m, args) {

        if(!m.member.hasPermission('ADMINISTRATOR')) return m.reply("I don't think you have the facilities for that, big man.");

        if(betState["closed"]) {

            if(JSON.stringify(bets) == "{}") return m.reply('No one has bet.');

            request("http://ergast.com/api/f1/current/last/results.json", {json: true}, (err, result, body) => {
               if(err) throw err;

                let res = body.MRData.RaceTable.Races[0];

                let resultsArray = body.MRData.RaceTable.Races[0].Results;

                let first = resultsArray[0].number;
                let firstFirstName = resultsArray[0].Driver.givenName;
                let firstLastName = resultsArray[0].Driver.familyName;

                let second = resultsArray[1].number;
                let secondFirstName = resultsArray[1].Driver.givenName;
                let secondLastName = resultsArray[1].Driver.familyName;

                let third = resultsArray[2].number;
                let thirdFirstName = resultsArray[2].Driver.givenName;
                let thirdLastName = resultsArray[2].Driver.familyName;

                let firstOdd = Number(odd[first]);
                let secondOdd = Number(odd[second]);
                let thirdOdd = Number(odd[third]);

                m.reply("The podium for the last race was the following : \n- 1rst: N°" + first + " " + firstFirstName + " " + firstLastName + "\n- 2nd: N°" + second + " " + secondFirstName + " " + secondLastName + "\n- 3rd: N°" + third + " " + thirdFirstName + " " + thirdLastName);
                m.reply("Retrieving bets...");

                for(let [key, value] of Object.entries(bets)) {
                    if(value.length == 2) {
                        if(value[0] == first) {
                            let price = Number(value[1]);
                            let userId = key;

                            let better = m.client.users.cache.find(user => user.id === userId);
                            let won = Math.ceil(price*firstOdd);

                            m.channel.send(better.toString() + " just won " + won + " <:f1coin:834897400610029568> !");
                            setBalance(better.id, getBalance(better.id) + won);
                        }
                    } else if(value.length == 4) {
                        let price = Number(value[3]);
                        let userId = key;

                        if (value[0] == first && value[1] == second && value[2] == third) {
                            let better = m.client.users.cache.find(user => user.id === userId);
                            let won = Math.ceil((price*firstOdd) + ((price*secondOdd)/2) + ((price*thirdOdd)/3));
                            m.channel.send(better.toString() + " just won " + won + " <:f1coin:834897400610029568> !");
                            setBalance(better.id, getBalance(better.id) + won);
                        }
                    }
                }

                bets = {};
                saveBets();
                m.reply("The bets are now clear.");

            });

            return;

        }

        return m.reply("The bets are not closed. Please close them first.")

    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Reveal Command")
            .addField("Description: ", "This command allows you to reveal the results and thus see the winners.", false)
            .addField("Usage: ", "$reveal")
            .setFooter("This command is an admin-only command.")
            .setColor("RED");
        m.reply(embed);
    }
}