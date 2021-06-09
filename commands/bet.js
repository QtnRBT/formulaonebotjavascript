global.winnerBetting = new Map();
global.podiumBetting = new Map();

const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bet",
    aliases: ["placebet"],
    admin: false,
    description: "This command allows you to place your bet, either on a winner or on the podium formation.",
    usage: "$bet <winner/podium>",
    execute(m, args) {
        if(betState["closed"]) return m.reply("The bets are closed.");
        if (args.length >= 1) {
            if(args[0] == "winner") {
                winnerBetting.set(m.author.id, []);
                podiumBetting.delete(m.author.id);
                m.reply("Please reply to this message with the number of the driver you think will win the race.");
                return;
            } else if(args[0] == "podium") {
                podiumBetting.set(m.author.id, []);
                winnerBetting.delete(m.author.id);
                m.reply("Please enter the car number of the driver you think will win the race.");
                return;
            }
        } else {
            m.reply(this.usage);
            return;
        }
    },
    winner(msg) {
        if(winnerBetting.get(msg.author.id) != null && winnerBetting.get(msg.author.id).length == 0) {
            let carNumber = msg.content.split(" ")[0];
            if(Number(carNumber).toString() != "NaN") {
                for(let key of Object.keys(odd)) {
                    if(key == carNumber) {
                        winnerBetting.set(msg.author.id, [carNumber]);
                        msg.reply("Now, type in the amount of coins you want to bet.");
                        return;
                    }
                }
            }
        } else if(winnerBetting.get(msg.author.id).length == 1) {
            let price = msg.content.split(" ")[0];
            if(Number(price).toString() != "NaN") {
                price = Number(price);
                if(getBalance(msg.author.id) >= price) {
                    winnerBetting.set(msg.author.id, [winnerBetting.get(msg.author.id)[0], price]);
                    let carNumber = winnerBetting.get(msg.author.id)[0];
                    msg.reply("Your bet has been placed on the car N°" + carNumber);
                    msg.reply("The odd for this driver is " + odd[carNumber] + " so your gain will be (*rounded up to the next integer*) "+ price + "*" + odd[carNumber] + " : " + Math.ceil(price*odd[carNumber]) + " <:f1coin:834897400610029568>");
                    setBalance(msg.author.id, getBalance(msg.author.id) - price);
                    let bet = winnerBetting.get(msg.author.id);
                    bets[msg.author.id] = bet;
                    winnerBetting.delete(msg.author.id);
                    saveBets();
                    writeData();
                    return;
                }
            }
        }
    },
    podium(msg) {
        if(podiumBetting.get(msg.author.id) != null && podiumBetting.get(msg.author.id).length == 0) {
            let carNumber = msg.content.split(" ")[0];
            if(Number(carNumber).toString() != "NaN") {
                for(let key of Object.keys(odd)) {
                    if(key == carNumber) {
                        podiumBetting.set(msg.author.id, [carNumber]);
                        msg.reply("Now, type in the car number of the driver you think will finish 2nd.");
                        return;
                    }
                }
            }
        } else if(podiumBetting.get(msg.author.id).length == 1) {
            let carNumber = msg.content.split(" ")[0];
            if(Number(carNumber).toString() != "NaN") {
                for(let key of Object.keys(odd)) {
                    if(key == carNumber) {
                        podiumBetting.set(msg.author.id, [podiumBetting.get(msg.author.id)[0], carNumber]);
                        msg.reply("Now, type in the car number of the driver you think will finish 3rd.");
                        return;
                    }
                }
            }
        } else if(podiumBetting.get(msg.author.id).length == 2) {
            let carNumber = msg.content.split(" ")[0];
            if(Number(carNumber).toString() != "NaN") {
                for(let key of Object.keys(odd)) {
                    if(key == carNumber) {
                        podiumBetting.set(msg.author.id, [podiumBetting.get(msg.author.id)[0], podiumBetting.get(msg.author.id)[1], carNumber]);
                        msg.reply("Now, type in the amount of coins you want to bet.");
                        return;
                    }
                }
            }
        } else if(podiumBetting.get(msg.author.id).length == 3) {
            let price = msg.content.split(" ")[0];
            if(Number(price).toString() != "NaN") {
                price = Number(price);
                if(getBalance(msg.author.id) >= price) {
                    podiumBetting.set(msg.author.id, [podiumBetting.get(msg.author.id)[0], podiumBetting.get(msg.author.id)[1], podiumBetting.get(msg.author.id)[2], price]);
                    let carNumber = podiumBetting.get(msg.author.id)[2];
                    let bet = podiumBetting.get(msg.author.id);
                    msg.reply("Your bet has been placed on this podium: \n- 1rst : N°" + bet[0] + "\n- 2nd : N°" + bet[1] + "\n- 3rd : N°" + bet[2]);
                    msg.reply("The odd for these drivers are " + odd[bet[0]] + " " + odd[bet[1]] + " " + odd[bet[2]] + " so your gain will be ("+ price + "x" + odd[bet[0]] + ") + (" + price + "x" + odd[bet[1]] + ")/2 + (" + price + "x" + odd[bet[2]] + ")/3" + " : " + Math.ceil((price*odd[bet[0]]) + ((price*odd[bet[1]])/2) + ((price*odd[bet[2]])/3)) + " <:f1coin:834897400610029568>");
                    setBalance(msg.author.id, getBalance(msg.author.id) - price);
                    bets[msg.author.id] = bet;
                    podiumBetting.delete(msg.author.id);
                    saveBets();
                    writeData();
                    return;
                }
            }
        }
    },
    getHelp(msg) {
        let embed = new MessageEmbed()
            .setTitle("Place Bet Command")
            .addField("Description: ", "This command allows you to place your bet, either on a winner or on a specific podium. Your gain will be calculated based on the following formula : what you pay x the odd of the driver. If you placed a bet on a podium, the formula will be : (pay x odd of winner) + ((pay x odd of 2nd)/2) + ((pay x odd of 3rd)/3). Since we want to make sure you never have some bizarre balance, we are rounding up this gain (to the next integer because we are nice people).", false)
            .addField("Usage: ", "$bet <winner/podium>")
            .setColor("GREEN")
            .setFooter("Anybody can use this command.");
        msg.channel.send(embed);
    }
}

global.saveBets = function() {
    fs.writeFileSync('./data/bets.json', JSON.stringify(bets));
}