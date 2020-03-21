require('dotenv').config();
const axios = require('axios');

const Discord = require('discord.js');
const client = new Discord.Client();

const KANYE_NAMES = ['yeezy', 'yeezus', 'ye', 'kanye', 'mr west'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', msg => {
  const message = msg.content.toLowerCase()
  if(KANYE_NAMES.includes(message)) {
    axios.get('https://api.kanye.rest')
    .then(response => {
      msg.reply(response.data.quote);
    }).catch(e =>{
      console.log(e)
    })
  }
})

client.login(process.env.DISCORD_TOKEN);
