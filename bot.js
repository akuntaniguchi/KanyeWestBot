require('dotenv').config();
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

client.on('ready', () => {
  console.log(`Logged in as ${ client.user.tag }`);
})

client.on('messageCreate', msg => {
  const message = msg.content.toLowerCase();
  const words = message.split(' ');

  for(const name of KANYE_NAMES) {
    if(words.includes(name)) {
      axios.get('https://api.kanye.rest')
        .then(response => {
          msg.reply(response.data.quote)
        }).catch(e =>{
          console.log(e)
        })
        break;
    }
  }
})

client.login(process.env.DISCORD_TOKEN);
