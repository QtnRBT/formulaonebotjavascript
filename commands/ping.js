module.exports = {
    name: "ping",
    description: "A simple ping command",
    execute(message, args) {
        message.reply("Pong :ping_pong:");
    }
}