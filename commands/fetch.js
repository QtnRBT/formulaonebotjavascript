const request = require("request");
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "fetch",
    usage: "$fetch",
    description: "This command allows you to fetch the Formula One api to get the latest result. It acts as a verification for the admins before revealing the winners.",
    admin: true,
    execute(message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("I don't think you have the facilities for that, big man.");

        let raceName = "";
        let circuitName = "";
        let finalData = "";

        request("http://ergast.com/api/f1/current/last/results.json", {json: true}, (err, res, body) => {
           if(err) throw err;

           message.reply(body.MRData.RaceTable.Races[0].Circuit.circuitName);
           let resultsArray = body.MRData.RaceTable.Races[0].Results;
           console.log(resultsArray);
            for (const result of resultsArray) {
                //console.log()
                console.log(result.Driver.givenName + " " + result.Driver.familyName.toUpperCase() + " car N°" + result.number + " finished in P" + result.position);
            }
        });
        //message.reply(raceName);
        message.reply("Check console.");
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Fetch Command")
            .addField("Description: ", "This command allows you to check for the last race name, by calling the api, to verify if you can reveal.", false)
            .addField("Usage: ", "$fetch")
            .setFooter("This command is an admin-only command.")
            .setColor("RED");
        m.reply(embed);
    }
}