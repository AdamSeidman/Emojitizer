/**
 * Author: Adam Seidman
 * 
 * Main entry point for emojitizer bot.
 * 
 */

const { token } = require('./config')
const Discord = require('discord.js')
const emoji = require('emoji-dictionary')

const MAX_REACTIONS = 5
const IGNORABLES = ['the', 'and', 'too', 'with', 'you', 'are', 'flag', 'face', 'man', 'out', 'on', 'not', 'no']

// Bot Intentions
const myIntents = ['Guilds', 'GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents']
const myPartials = ['Channel']

const bot = new Discord.Client({ intents: myIntents, partials: myPartials })
bot.login(token)

bot.on('ready', () => {
    console.log('Emojitizing...')
})

bot.on('messageCreate', msg => {
    if (msg !== undefined && msg.content !== undefined && msg.content.length > 0) {
        let text = msg.content
        text = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').replace(/\s{2,}/g,' ')
        text = text.split(' ').filter(x => x.length > 2 && !IGNORABLES.includes(x))
        text.forEach(x => text.push(x.slice(0, x.length - 1)))
        text = text.filter(x => !IGNORABLES.includes(x))
        let emojiList = []
        let exclusions = []
        emoji.names.forEach(name => {
            let list = name.split('_').filter(x => !IGNORABLES.includes(x))
            list.some(word => {
                if (text.includes(word) && !exclusions.includes(word) && name.length > 2) {
                    emojiList.push(name)
                    exclusions.push(word)
                    exclusions.push(word.slice(0, word.length - 1))
                    return true
                }
                return false
            })
        })
        if (emojiList.length > MAX_REACTIONS) {
            emojiList = emojiList.slice(0, MAX_REACTIONS)
        }
        if (emojiList.length > 0) {
            emojiList.forEach(x => msg.react(emoji.getUnicode(x)))
        }
    }
})
