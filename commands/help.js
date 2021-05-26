const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    usage: "$help [<nameOfTheCommand>]",
    description: "Allows you to get help from the bot",
    admin: false,
    execute(m, args) {
        if(args.length == 0) {
            let s = "";
            let s2 = "";
            let c = commands;
            for(let tab of c) {
                if(!globalClient.commands.get(tab[2]).admin) {
                    s += "-**" + tab[0] + "** : " + tab[1] + "\n";
                }
            }
            for(let tab of c) {
                if(globalClient.commands.get(tab[2]).admin) {
                    s2 += "-**" + tab[0] + "** : " + tab[1] + "\n";
                }
            }
            let embed = new Discord.MessageEmbed()
                .setTitle("F1 Lovers - Help")
                .setDescription("Notice : arguments between <> are mandatory while arguments between [<>] are optional.")
                .addField("Talking in the right channel", "Every channel on this server has got a purpose. You can see what it was meant for in the channel description, as well as in the name of this specific channel. Please stay organized and talk in the right channels to ensure comprehension.")
                .addField("Commands :", s, false)
                .addField("Admin Commands :", s2, false)
                .setFooter("To get help on a specific command, type $help <commandWithoutThe$>")
                .setColor("#f1c40f");
            m.reply(embed);
        } else {
            for(let c of commands) {
                if(c[2] == args[0]) {
                    globalClient.commands.get(c[2]).getHelp(m);
                    return;
                }
            }
            m.reply("This command doesn't exist.");
        }
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Help Command")
            .addField("Description: ", "This command allows you to see the bot's help.", false)
            .addField("Usage: ", "$help [<commandName>]")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}