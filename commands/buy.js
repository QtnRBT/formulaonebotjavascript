const {MessageEmbed} = require('discord.js');
module.exports = {
    name: "buy",
    description: "A command that allows you to buy anything in the shop.",
    usage: "$buy <numberOfTheItem>",
    admin: false,
    execute(m, args) {
        if(args.length >= 1) {
            if(Number(args[0]).toString() != "NaN") {
                let balance = profile[m.member.id].balance;
                let inventory = profile[m.member.id].inventory;

                let whatToBuy = null;
                let whatToBuyCat = "";

                for(const emoji of shop.emojis) {
                    if (Object.values(emoji)[0] == Number(args[0])) {
                        whatToBuy = emoji;
                        whatToBuyCat = "emojis";
                    }
                }

                if(whatToBuy == null) {
                    for(const role of shop.roles) {
                        if(Object.values(role)[0] == Number(args[0])) {
                            whatToBuy = role;
                            whatToBuyCat = "roles";
                        }
                    }
                }

                if(whatToBuy != null) {
                    if (inventory.includes(whatToBuy["name"])) return m.reply("You already own this item.");
                    let price = whatToBuy["price"];
                    if(whatToBuyCat == "emojis") {
                        if(m.member.roles.cache.get("844944728885690419")) {
                            price = Math.round(price/2);
                        }
                        if(balance >= price) {
                            profile[m.member.id].inventory.push(whatToBuy["name"]);
                            profile[m.member.id].balance = profile[m.member.id].balance - price;
                            writeData();
                            retrieveData();
                            m.reply("Successfully bought " + whatToBuy["name"]);
                            return;
                        } else {
                            m.reply("You don't have enough money for this.");
                            return;
                        }
                    } else if (whatToBuyCat == "roles") {
                        if(m.member.roles.cache.get("844944728885690419")) return m.reply("You already own this item.");
                        if(balance >= price) {
                            profile[m.member.id].balance = profile[m.member.id].balance - price;
                            m.member.roles.add(m.guild.roles.cache.get(whatToBuy["roleId"]));
                            m.reply("Successfully bought");
                            writeData();
                            retrieveData();
                            return;
                        } else {
                            m.reply("You don't have enough money for this.");
                            return;
                        }
                    }
                } else {
                    m.reply("Please enter a valid product id");
                }

            } else {
                m.reply("Please enter a valid product id.");
            }
        }
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Buy Command")
            .addField("Description: ", "This command allows you buy any item from the shop.", false)
            .addField("Usage: ", "$buy <numberOfTheItem>")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}