require('dotenv').config();

// Strip BOM/CRLF from .env values — undici rejects Authorization headers with \r or \n
const discordToken = process.env.DISCORD_TOKEN?.replace(/^\uFEFF/, '').trim();
if (!discordToken) {
  console.error('Set DISCORD_TOKEN in .env (no quotes, no spaces around =).');
  process.exit(1);
}

const axios = require('axios');
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]
});

const KANYE_NAMES = ['yeezy', 'yeezus', 'ye', 'kanye'];
const KANYE_REGEX = new RegExp(`\\b(${KANYE_NAMES.join('|')})\\b`, 'i');

client.on('clientReady', () => {
  console.log(`Logged in as ${ client.user.tag }`);
})

client.on('messageCreate', msg => {
  if (!KANYE_REGEX.test(msg.content)) return;

  axios.get('https://api.kanye.rest')
    .then(response => {
      msg.reply(response.data.quote);
    })
    .catch(e => {
      const status = e.response?.status;
      console.error(`Failed to fetch Kanye quote${status ? ` (HTTP ${status})` : ''}:`, e.message);
    });
})

client.login(discordToken);
