const Discord = require('discord.js');
const config = require('./json/config.json')
const token = require('./json/token.json')
const client = new Discord.Client();

client.on('ready', () => {
    console.log (`Conectado como: ${client.user.tag}`);
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando == 'clear') {
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('Nao tenho autoridade!!');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply ('Voce nao possui autoridade para tal!')
        if (!args[0]) return message.reply ('Informe a quantidade de mensagens!!')
        if (isNaN(args[0]) && args[0] <= 0) return message.reply('Me informe a quantidade de mensagens corretamente!!')
        if (args[0] >= 100) {
            message.delete()
            message.channel.bulkDelete(99, true)
        } else {
            message.delete()
            message.channel.bulkDelete(args[0], true)
        }
    }
})

client.login(token.token);