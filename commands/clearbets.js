module.exports = {
    name: "clearbets",
    description: "This command allows you to clear the bets",
    admin: true,
    usage: "$clearbets",
    execute(m, args) {
        bets = {};
        saveBets();
        m.reply("The bets are now clear.");
        return;
    }
}