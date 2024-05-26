//const keepAlive = require("./server")
const { ActionRowBuilder, Client, IntentsBitField, ButtonBuilder, ButtonStyle } = require('discord.js');
const { InteractionCreate } = require('discord.js/src/util/Events');
const token = '';
const linksAndFiles = '';
const projNotes = '';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is ready!`);
});

client.on('messageCreate', (msg) => {
  console.log(`msg received`);
  var curTime = msg.createdAt;

  if ((msg.channelId === linksAndFiles) || (msg.channelId === projNotes) || msg.author.bot) {
    console.log(`reply not permitted`);
    return;
  }
  else if (curTime.getHours() < 6 || curTime.getHours() > 21) {
    console.log(`trying to reply`);
    msg.channel.send({
      content: `Time for bed ${msg.author.displayName}, klokken er ${curTime.getHours()}:${curTime.getMinutes()} !`,
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId(`confirm`)
            .setLabel(`haha okay`)
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`cancel`)
            .setLabel(`nej >:)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true),
          new ButtonBuilder()
            .setLabel(`spillemand, spil mig en lullaby`)
            .setURL(`https://youtu.be/dQw4w9WgXcQ`)
            .setStyle(ButtonStyle.Link)
        ),
      ],
    });
  }
});

client.on(InteractionCreate, (interaction) => {
  console.log(`was interacted with`);
  if(interaction.isButton()){
    interaction.reply({content: `godt :sleeping_accommodation:`});
  }
});

// keepAlive()

client.login(token);