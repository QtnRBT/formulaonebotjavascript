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

                let carNumber = resultsArray[0].number;
                let firstName = resultsArray[0].Driver.givenName;
                let lastName = resultsArray[0].Driver.familyName;

                let driverOdd = Number(odd[carNumber]);

                m.reply(firstName + " " + lastName + " (" + carNumber + ") has won the " + res.raceName + " which took place at the " + res.Circuit.circuitName);
                m.reply("Retrieving bets...");

                for(let [key, value] of Object.entries(bets)) {
                    if(value[0] == carNumber) {
                        let price = Number(value[1]);
                        let userId = key;

                        let better = m.client.users.cache.find(user => user.id === userId);
                        let won = Math.ceil(price*driverOdd);

                        m.channel.send(better.toString() + " just won " + won + " <:f1coin:834897400610029568> by betting on " + firstName + " " + lastName + " !");
                        setBalance(better.id, getBalance(better.id) + won);
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