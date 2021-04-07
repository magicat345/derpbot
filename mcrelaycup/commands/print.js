module.exports = {
    name: 'print',
    description: 'just repeat the rest of the message i guess',
    execute(message, args) {
        message.channel.send(args.join(' '));
    }
}