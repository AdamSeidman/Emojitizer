/**
 * Author: Adam Seidman
 * 
 * Main entry point for emojitizer bot.
 * 
 */

const { token } = require('./config')
const Discord = require('discord.js')
const emoji = require('emoji-dictionary')

// Bot Intentions
const myIntents = ['Guilds', 'GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents']
const myPartials = ['Channel']

const bot = new Discord.Client({ intents: myIntents, partials: myPartials })

bot.on('ready', () => {
    console.log('Emojitizing...')
})

bot.on('messageCreate', msg => {
    if ( msg !== undefined && msg.content !== undefined && msg.content.length > 0 ) {
        // React to message
    }
})