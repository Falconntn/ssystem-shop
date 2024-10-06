const express = require('express');
const app = express();
app.listen(() => console.log(('General Progs Help you every time ↗️ ')));
app.use('/ping', (req, res) => {  res.send(new Date());
});

app.listen(3000, () => {
  console.log('Bot Started !');
});

const { Client, Collection, Intents,MessageActionRow,MessageButton,MessageEmbed,MessageSelectMenu,Permissions , Discord, EmbedBuilder, Modal, TextInputComponent } = require('discord.js');
const fs = require('fs')
const inlinereply = require('discord-reply');
const probot = require("probot-tax");
const data = require("./config.json")
const mainGuildID = require("./config.json")
const coolDown = new Set()    
const dotenv = require('dotenv')
const db = require("pro.db")
const mongoose = require("mongoose")
dotenv.config()
let prefix = "-"
let sug = "";
let tax = "";
let order = "";
let cmd = "";
// the client
  let client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION "], repliedUser: false, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });

module.exports = client

	// Commands && SlashCommands && Events Handling and Initializing The Whole Project..

	client.config = data
	client.commands = new Collection();
	client.aliases = new Collection();
	client.events = new Collection();
	client.slashCommands = new Collection();
	client.queue = new Map();
	require(`./source/handlers/cmdHandler/command.js`)(client);
	require(`./source/handlers/slashHandler/slash.js`)(client);
	require(`./source/handlers/eventHandler/events.js`)(client);
	
// handling errors 
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('typeError', error => {
	console.error('Unhandled type rejection:', error);
});
/*
setTimeout(() => {
	if (!client || !client.user) {
		console.log("Client Not Login, Process Kill")
		process.kill(1);
	} else {
		console.log("login Auto kill 1 ")
	}
}, 1 * 200 * 20);*/
const chalk = import('chalk');

client.on('ready', () =>{
   console.log("\x1b[31m", `BotName: ${client.user.tag}\nBotPrefix: / `
            );
  console.log("\x1b[32m", `Servers Count : ${client.guilds.cache.size}`)
  console.log(`Users Count : ${client.guilds.cache
.reduce((a, b) => a + b.memberCount, 0)
.toLocaleString()}`)
  client.user.setActivity(client. config.Activity, {type: client.config.ActivityType})
})

mongoose.connect(process.env.mongodb).then(() => console.log("\x1b[36m", `Data Connected `));

client.login(process.env.token);

client.on("interactionCreate", async (interaction) => {
if(interaction.customId === "clos"){
      
    if (interaction.message && interaction.message.delete) {
  await interaction.message.delete();
    }
      interaction.channel.send({content:`$close` })
    interaction.channel.send({content:`$transcript` })
  interaction.channel.send({content:`$delete` })
    }
  if(interaction.customId === "open-rooms"){
    interaction.reply({content:`موعد غلق الرومات الساعة 2:00 مساء بتوقيت مصر `,ephemeral:true})
  }
  if(interaction.customId === "close-rooms"){
    interaction.reply({content:`موعد فتح الرومات الساعه 10:00 صباح بتوقيت مصر`,ephemeral:true})
  }
      })

const donesendpost = new MessageEmbed()
             .setColor(data.color)
    .setDescription(`**تم ارسال منشورك في <#1156713722287489236>**`)

const permissions = new MessageEmbed()
      .setColor(data.color)
      .setTitle(`> ليس لديك صلاحيات لاستخدام الامر المطلوب `)

client.on('messageCreate', message => { 
  if (message.content === (`خط`)) {
    
message.channel.send({files:[data.lineurl]})
  message.delete()
        }})

client.on("messageCreate", async message => {

  if (sug.includes(message.channel.id)) {
  if(message.author.bot)return;
  message.react("✅")
  message.react("❎")
message.reply({files:[data.lineurl]})
}})

client.on('messageCreate', async message => {       
  if (order.includes(message.channel.id)) {
   if(message.author.bot)return;
    message.delete(); 
  }})
client.on('messageCreate', async message => {       
  if (cmd.includes(message.channel.id)) {
   if(message.author.bot)return;
    message.delete(); 
  }})

client.on("messageCreate", async (msg) => {
  if (msg.channel.id === "1156713057574191104" && !msg.author.bot) { 
    try {
        msg.delete(); 
      const messageEmbed = new MessageEmbed()
        .setColor(data.color)
        .setAuthor(msg.author.username , msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`> **${msg.content}**`)
        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
        .setTimestamp();
      const sentMessage = await msg.channel.send({ embeds: [messageEmbed] });
  await msg.channel.send({files:[data.lineurl]});
    } catch (error) {
      console.error(error);
    }
  }
});

client.on("messageCreate" , async em => {
    
const allowedRoles = ['1156713057574191104'];

  if (em.content.startsWith('-embed') && em.guild) {
    const member = em.member;
  
let msg = em.content.split(" ").slice(1).join(" ")
    
 if (member && member.roles.cache.some(role => allowedRoles.includes(role.id))) { 
   
  em.delete(); 
 if(!msg)return em.reply(`> ** Put Your Message**`)
  let attach = em.attachments.first()
  if (attach){
let attachmd = new MessageEmbed()
  .setColor(data.color)
  .setDescription(msg)   .setImage(`${attach.url}`)
    .setFooter(data.foot)
.setAuthor(em.guild.name , em.guild.iconURL({ dynamic: true }))
.setThumbnail(em.guild.iconURL({ dynamic: true }))    
   em.channel.send({embeds: [attachmd]})
em.channel.send({files:[data.lineurl]});
    
  } else {
  let embed = new MessageEmbed()
  .setColor(data.color)
.setDescription(msg)
.setFooter(data.foot)
.setAuthor(em.guild.name , em.guild.iconURL({ dynamic: true }))
.setThumbnail(em.guild.iconURL({ dynamic: true }))
    
    await em.channel.send({embeds: [embed]})
em.channel.send({files:[data.lineurl]});
   } 
 
   }
 }})
  
client.on('messageCreate', async message => {
  const allowedRoles = ['1156713154798174340', '1156713092722462730', '1145081258687344761'];

  if (message.content.startsWith('-come') && message.guild) {
    const member = message.member;
    
    if (member && member.roles.cache.some(role => allowedRoles.includes(role.id))) {
      const args = message.content.slice(6).trim().split(/ +/);
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        return message.channel.send('*mention a user*')
      }
      
  await user.send({content: `⚠️ { ${user} } { <#${message.channel.id}> }** تم طلبك هنا من فضلك تعال بسرعة ⚠️**`})
message.channel.send(`> **Done Send Private to** ${user} :tools:



> **Please Wait Come Member ** :tools:
`);
 } }})

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("-منشور")) {
    const roleId = data.high;
    if (!message.member.roles.cache.has(roleId)) {
      return message.reply({embeds: [permissions]});
    }
        const args = message.content.slice("-منشور".length).trim().split(/ +/);
    const mention = args.shift();
    const content = args.join(" ")

    if (!mention) {
      return message.reply("**منشن شخص**")
    } 
    if (!content) {
      return message.reply("** ضع المنشور مع المنشن**")
    } 
    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return message.reply("**المنشن غير صحيح**");
    }

    const postEmbed = new MessageEmbed()
      .setColor(data.color)
      .setTitle("منشور جديد")
      .setDescription(content)
      .setFooter(`Contact: ${mentionedUser.tag}`, mentionedUser.displayAvatarURL({ dynamic: true }));

    const hereButton = new MessageButton()
      .setLabel("Here")
      .setStyle("SECONDARY")
      .setCustomId("hereButton");

    const everyoneButton = new MessageButton()
      .setLabel("Everyone")
      .setStyle("SECONDARY")
      .setCustomId("everyoneButton");
  
const cancelButton = new MessageButton()
.setLabel("Cancel")
.setStyle("DANGER")
.setCustomId("cancelButton");
    
    const row = new MessageActionRow().addComponents(hereButton, everyoneButton, cancelButton);

    const sentMessage = await message.channel.send({ embeds: [postEmbed], components: [row] });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000 });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "hereButton") {

let msg = new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`msg`)
//.setLabel("")
.setEmoji("<:AS_Recycling:1155147875441975450> ")
.setStyle('SECONDARY'));
        
        const mentionHere = "@here";
        const contentHere = `${content}\n@here\nتواصل مع ${mention}`;
        await message.client.channels.cache.get(data.shareroom).send({content: `${contentHere}`, components: [msg]});
        await interaction.deferUpdate();
        return interaction.editReply({embeds: [donesendpost],components:[] });
      } else if (interaction.customId === "everyoneButton") {
let msg = new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`msg`)
//.setLabel("")
.setEmoji("<:AS_Recycling:1155147875441975450> ")
.setStyle('SECONDARY'));
        
        const mentionEveryone = "@everyone";
        const contentEveryone = `${content}\n@everyone\nتواصلوا مع ${mention}`;
        await message.client.channels.cache.get(data.shareroom).send({content: `${contentEveryone}`, components: [msg]});
       await interaction.deferUpdate();
        return interaction.editReply({embeds: [donesendpost],components:[] });
      } else if (interaction.customId === "cancelButton") {
        if (interaction.message && interaction.message.delete) {
  await interaction.message.delete();
}
      }
});
        }
      })

const CategoryID = data.buycategoryId

client.on("channelCreate", async channel => {
if (channel.type === "GUILD_TEXT" && channel.name.startsWith("ticket-") && channel.parent.id === CategoryID) {

await new Promise(r => setTimeout(r, 1000))

  
//await new Promise(r => setTimeout(r, 3000))
  let row = new MessageActionRow()
   	.addComponents(   new MessageButton()
        .setCustomId(`clos`)
        .setLabel("Close Ticket")
        .setEmoji("🔒")
        .setStyle('DANGER'))
  	.addComponents(   new MessageButton()
        .setCustomId(`claim`)
        .setLabel("Claim Ticket")
  .setEmoji("<:AS_Admin:1155048055494676500> ")
        .setStyle('SECONDARY')
      )
  
  
  const support = new MessageEmbed()
       .setColor(data.color)
        .setAuthor(channel.guild.name , channel.guild.iconURL({ dynamic: true }))
        .setDescription(`# - ${data.title} Rules Support・قوانين الدعم الفني

- **ممنوع الاستهبال في الدعم الفني ** 
** __ You can't joking in the ticket __ **

- ** ممنوع تفتح تكت لغرض الاستهبال ** 
** __  You can't open the Ticket to joke __** 

- ** ممنوع الازعاج بالمنشن (في حال لم يتم الرد ، يسمح لك منشن الدعم الفني مره واحده فقط ** 
** لرتبة <@&1145081258687344761> **
** __ You can't disturb others with mentioning them , You can mention the support for once __ **

- ** ممنوع طرح الأسئلة الي ما تخص السيرفر ك طلب كرديت و الخ . .**
** __ You can't ask questions what's not connected with server __ **


** يمكنك حل جميع المشاكل يلي تواجهك في السيرفر عن طريق الدعم الفني**
** __ You can Solve all of  your problems in the server in ticket for support __**`)
  .setImage(``)    
    .setThumbnail(channel.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
      .setFooter({text : `${data.foot}`})
  
channel.send({ embeds: [support], components: [row] });

channel.send({ content: `**لشراء ( " رتبة " , منشور مميز " , " روم خاص " )
قم بكتابة امر
> -buy **` });

  
}
});
    

client.on('messageCreate', async message => {
  const allowedRoles = ['1156713067963498629'];

   if (message.content.startsWith('-send') && message.guild) {
    const member = message.member;
    
    if (member && member.roles.cache.some(role => allowedRoles.includes(role.id))) {
      
let msg = new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`msg1`)
.setEmoji("<:AS_Recycling:1155147875441975450> ")
.setStyle('SECONDARY'))
   
   let sendsupport = new MessageEmbed()
        .setColor(data.color)
        .setAuthor(message.guild.name , message.guild.iconURL({ dynamic: true }))
        .setDescription(`# - ${data.title} Rules Support・قوانين الدعم الفني

- **ممنوع الاستهبال في الدعم الفني ** 
** __ You can't joking in the ticket __ **

- ** ممنوع تفتح تكت لغرض الاستهبال ** 
** __  You can't open the Ticket to joke __** 

- ** ممنوع الازعاج بالمنشن (في حال لم يتم الرد ، يسمح لك منشن الدعم الفني مره واحده فقط ** 
** لرتبة <@&1156713154798174340> **
** __ You can't disturb others with mentioning them , You can mention the support for once __ **

- ** ممنوع طرح الأسئلة الي ما تخص السيرفر ك طلب كرديت و الخ . .**
** __ You can't ask questions what's not connected with server __ **


** يمكنك حل جميع المشاكل يلي تواجهك في السيرفر عن طريق الدعم الفني**
** __ You can Solve all of  your problems in the server in ticket for support __**`)
  .setImage(``)    
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
      .setFooter({text : `${data.foot}`})
      
   message.channel.send({ embeds: [sendsupport], components: [msg] });
  }}})

const TaxChannel = "1157346807651782698" // ايدي الات شانل الاوتو تاكس

// ==================== Auto Tax ====================== \\

client.on("messageCreate", message => {
 if(message.channel.type === "dm" || 
  message.author.bot) return
  
if(TaxChannel.includes(message.channel.id)){

  var args = message.content.split(' ').slice(0).join(' ')
if(!args) return;
  
if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
     let args2 = parseInt(args)
    let tax = Math.floor(args2 * (20) / (19) + (1))
    let tax2 = Math.floor(args2 * (20) / (19) + (1) - (args2))
    let tax3 = Math.floor(tax2 * (20) / (19) + (1))
    let tax4 = Math.floor(tax2 + tax3 + args2)
      
    let Taxembed = new MessageEmbed()

   .setThumbnail(client.user.avatarURL({ dynamic: true }))   
.addField(`السعر بدون ضرايب : `,`${args2 - (args2 * 0.05)}`)
.addField(`السعر مع ضرايب :`,`${tax}`)
.addField(`ضرايب الوسيط (2.5%) بدون نسبة :`,`${args2 + (args2 * 0.025)}`)
.addField(`ضرايب الوسيط (2.5%) مع نسبة :`,`${tax + (args2 * 0.025)}`)
.addField(`نسبة الوسيط :`,`${args2 * 0.025}`)
.addField(`التحويل بدون ضرايب :`,`${args2 - (args2 * 0.05)}`)
        .setColor(data.color)
      //.setColor(message.guild.me.displayColor)
  .setTimestamp()
message.reply({embeds: [Taxembed]})
  message.channel.send({files: [data.lineurl]}).catch((err) => {
   console.log(err.message)
   });    
  }
}); 

let channel_post = data.shareroom

client.on('messageCreate', async message => {
  if (message.channel.id === channel_post &&
      (message.content.includes('@here') || message.content.includes('@everyone'))) {
    
    message.channel.send({content:`**منشور مدفوع ،  نخلي مسؤوليتنا من يلي يصير بينكم
عايز مثله حياك <#1156713855511183450> **`});
    
    await new Promise(r => setTimeout(r, 1000))
    
    await message.channel.send({files:[data.lineurl]});
  }
});

channel_ads = data.adsroom

client.on('messageCreate', async message => {
  if (message.channel.id === channel_ads &&
      (message.content.includes('@here') || message.content.includes('@everyone'))) {
    
    message.channel.send({content:`**اعلان مدفوع ،  نخلي مسؤوليتنا من يلي يصير بالسيرفر
عايز مثله حياك <#1156713855511183450> `});
    
    await new Promise(r => setTimeout(r, 1000))
    
    await message.channel.send({files:[data.lineurl]});
  }
});

channel_ad = data.giftroom

client.on('messageCreate', async message => {
  if (message.channel.id === channel_ad &&
      (message.content.includes('@here') || message.content.includes('@everyone'))) {
    await new Promise(r => setTimeout(r, 1500))
   message.channel.send({content:`**اعلان مدفوع ،  نخلي مسؤوليتنا من يلي يصير بالسيرفر
عايز مثله حياك <#1156713855511183450>**`});
    
 message.channel.send({files:[data.lineurl]});
  }
});

client.on('messageCreate', async mesg => {
if(mesg.content == `-close`) {
  
  let row = new MessageActionRow()
   	.addComponents(   new MessageButton()
        .setCustomId(`close-rooms`)
        .setLabel("موعد الفتح")
        .setEmoji("🕙")
        .setStyle('SECONDARY')
      );
  
if(!mesg.member.roles.cache.find((role) => role.id=== '1156713057574191104')) //ايدي رول الي يقدر يتحكم
return mesg.reply({embeds:[permissions]})
let men = mesg.guild.roles.cache.find(role => role.id === '1158522563241181248'); //ايدي رول الممبر
if(!men) return;
let C1 = client.channels.cache.get(`1156713801933131836`); //Vip
let C2 = client.channels.cache.get(`1156713820732006452`); //acc
let C3 = client.channels.cache.get(`1156713815942115338`);  //dis
let C4 = client.channels.cache.get(`1156713806450397225`); //des 
let C5 = client.channels.cache.get(`1156713810879586384`); 
//dev
let C6 = client.channels.cache.get(`1156713834497716265`); 
//trq
let C7 = client.channels.cache.get(`1156713825463173250`); 
//coins
let C8 = client.channels.cache.get(`1156713829825261700`);
//gim
let C9 = client.channels.cache.get(`1156713840285843610`);
//other
//let C10 = client.channels.cache.get(`1145081577026637834`)
C1.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C2.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C3.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C4.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C5.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C6.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C7.permissionOverwrites.create(men,{'VIEW_CHANNEL': false});
C8.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); C9.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); 
//C10.permissionOverwrites.create(men,{'VIEW_CHANNEL': false}); 
C1.bulkDelete(100, true)
C2.bulkDelete(100, true)
C3.bulkDelete(100, true)
C4.bulkDelete(100, true)
C5.bulkDelete(100, true)
C6.bulkDelete(100, true)
C7.bulkDelete(100, true)
C8.bulkDelete(100, true)
C9.bulkDelete(100, true)
//C10.bulkDelete(100, true)
mesg.reply({ content : `__**Closed**__ ⛔️`});
let news = client.channels.cache.get(`1156713695049687161`);// ايدي الروم الي ينشر فيه حالة النشر
news.bulkDelete(100, true)
await news.send({content : `تم غلق الرومات`})
await news.send({files:[data.lineurl],components: [row]})   // رابط الخط
}})


client.on('messageCreate', async mesg => {
if(mesg.content == `-open`) {
  
  let row = new MessageActionRow()
   	.addComponents(   new MessageButton()
        .setCustomId(`open-rooms`)
        .setLabel("موعد الغلق")
        .setEmoji("🕝")
        .setStyle('SECONDARY')
      );
  
if(!mesg.member.roles.cache.find((role) => role.id=== '1156713057574191104')) //ايدي رول الي يقدر يتحكم
return mesg.reply({embeds:[permissions]})
let men = mesg.guild.roles.cache.find(role => role.id === '1158522563241181248'); //ايدي رول الممبر
if(!men) return;
let C1 = client.channels.cache.get(`1156713801933131836`); //Vip
let C2 = client.channels.cache.get(`1156713820732006452`); //acc
let C3 = client.channels.cache.get(`1156713815942115338`);  //dis
let C4 = client.channels.cache.get(`1156713806450397225`); //des 
let C5 = client.channels.cache.get(`1156713810879586384`); 
//dev
let C6 = client.channels.cache.get(`1156713834497716265`); 
//trq
let C7 = client.channels.cache.get(`1156713825463173250`); 
//coins
let C8 = client.channels.cache.get(`1156713829825261700`);
//gim
let C9 = client.channels.cache.get(`1156713840285843610`);
//other
//let C10 = client.channels.cache.get(`1145081577026637834`) 
C1.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C2.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C3.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C4.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C5.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C6.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C7.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C8.permissionOverwrites.create(men,{'VIEW_CHANNEL': true}); C9.permissionOverwrites.create(men,{'VIEW_CHANNEL': true}); 
//C10.permissionOverwrites.create(men,{'VIEW_CHANNEL': true});
C1.bulkDelete(100, true)
C2.bulkDelete(100, true)
C3.bulkDelete(100, true)
C4.bulkDelete(100, true)
C5.bulkDelete(100, true)
C6.bulkDelete(100, true)
C7.bulkDelete(100, true)
C8.bulkDelete(100, true)
C9.bulkDelete(100, true)
//C10.bulkDelete(100, true)
mesg.reply({ content : `**Rooms is Back**`});
let news = client.channels.cache.get(``);// ايدي الروم الي ينشر فيه حالة النشر
news.bulkDelete(100, true)
await news.send({content : `تم اظهار الرومات @here`})
await news.send({files:[data.lineurl],components: [row] })   // رابط الخط
}})

const timestamp = require('discord-timestamp');
const moment = require('moment');

client.on("interactionCreate", async interaction => {
  if (interaction.customId === "claim"){
//فحص الشخص 
  let support = client.config.supportid
    
if(!interaction.member.roles.cache.some((role) => role.id === support))
  
return interaction.reply({content: `**انت لست من طاقم الادارة**`, ephemeral: true } )
    
let row = new MessageActionRow()
  .addComponents(   new MessageButton()
        .setCustomId(`clos`)
        .setLabel("Close Ticket")
        .setEmoji("🔒")
        .setStyle('DANGER'))
			.addComponents(
        				new MessageButton()
        .setCustomId(`unclaim`)
        .setLabel("UnCliam")
        .setEmoji("➖")
        .setStyle('DANGER'))
    
await interaction.message.edit({embeds:[
      new MessageEmbed()
  
  .setColor(data.color)
  
.setAuthor(interaction.guild.name , interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`${data.title} Rules Support・قوانين الدعم الفني

- **ممنوع الاستهبال في الدعم الفني ** 
** __ You can't joking in the ticket __ **

- ** ممنوع تفتح تكت لغرض الاستهبال ** 
** __  You can't open the Ticket to joke __** 

- ** ممنوع الازعاج بالمنشن (في حال لم يتم الرد ، يسمح لك منشن الدعم الفني مره واحده فقط ** 
** لرتبة <@&1156713154798174340> **
** __ You can't disturb others with mentioning them , You can mention the support for once __ **

- ** ممنوع طرح الأسئلة الي ما تخص السيرفر ك طلب كرديت و الخ . .**
** __ You can't ask questions what's not connected with server __ **


** يمكنك حل جميع المشاكل يلي تواجهك في السيرفر عن طريق الدعم الفني**
** __ You can Solve all of  your problems in the server in ticket for support __**`)
  .setImage(`https://media.discordapp.net/attachments/1285582176007753842/1285960492157898822/7e738d79bd8698ce-1.png?ex=67029509&is=67014389&hm=ffcdea27308f2e3ede0feafc52da5097b443e941a499960f383632ef897592d7&`) .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
      .setFooter({text : `${data.foot}`})
  
], components:[row]}).then(async x => {
    let ch = interaction.channel
      ch.send(`$rename claimed-${interaction.member.user.username}`)
    
  await interaction.reply({content:`**تم استلام التكت بواسطتك** `,ephemeral:true })

  await interaction.message.reply({embeds:[
      new MessageEmbed()

  .setDescription(`**تم استلام التذكرة بواسطة <@${interaction.member.id}>**`)
  .setColor(data.color)

  ], components:[]})
  
 let owner = interaction.member.id
db.set(`ownerticket_${interaction.channel.id}`, owner)
  
let high = client.config.highroleId
  
let point = db.get(`points_${interaction.guild.id}`);
let ary = {
  user: `${interaction.member.id}`,
  points: 1
};

if (!point) {
  db.set(`points_${interaction.guild.id}`, [ary]);
} else {
  let found = point.find(x => x.user === interaction.member.id);
  if (found) {
    found.points += 1; // Increment the points by 1
    point[point.indexOf(found)] = found;
  } else {
    point.push(ary); // If user not found, add them with 1 point
  }
  db.set(`points_${interaction.guild.id}`, point);



    
  }

})
  
   } 
})

////leave it 

                                client.on("interactionCreate", async interaction => {
  if (interaction.customId === "unclaim"){
//فحص الشخص 
    let row = new MessageActionRow()
   	.addComponents(   new MessageButton()
        .setCustomId(`clos`)
        .setLabel("Close Ticket")
        .setEmoji("🔒")
        .setStyle('DANGER'))
  	.addComponents(   new MessageButton()
        .setCustomId(`claim`)
        .setLabel("Claim Ticket")
  .setEmoji("<:AS_Admin:1155048055494676500> ")
        .setStyle('SECONDARY')
      )
    
  let member = db.get(`ownerticket_${interaction.channel.id}`)
      
    
    if(!member){

      
      await interaction.reply({content:`لم اتم العثور على صاحب التكت `, ephemeral:true }).then(async aa=>{
      await interaction.message.edit({embeds:[
      new MessageEmbed()
  
  .setColor(data.color)
        .setAuthor(interaction.guild.name , interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`# - ${data.title} Rules Support・قوانين الدعم الفني

- **ممنوع الاستهبال في الدعم الفني ** 
** __ You can't joking in the ticket __ **

- ** ممنوع تفتح تكت لغرض الاستهبال ** 
** __  You can't open the Ticket to joke __** 

- ** ممنوع الازعاج بالمنشن (في حال لم يتم الرد ، يسمح لك منشن الدعم الفني مره واحده فقط ** 
** لرتبة <@&1156713154798174340> **
** __ You can't disturb others with mentioning them , You can mention the support for once __ **

- ** ممنوع طرح الأسئلة الي ما تخص السيرفر ك طلب كرديت و الخ . .**
** __ You can't ask questions what's not connected with server __ **


** يمكنك حل جميع المشاكل يلي تواجهك في السيرفر عن طريق الدعم الفني**
** __ You can Solve all of  your problems in the server in ticket for support __**`)
  .setImage(`https://media.discordapp.net/attachments/1285582176007753842/1285960492157898822/7e738d79bd8698ce-1.png?ex=67029509&is=67014389&hm=ffcdea27308f2e3ede0feafc52da5097b443e941a499960f383632ef897592d7&`)    
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
      .setFooter({text : `${data.foot}`})

  ], components:[row]})

   let support = client.config.supportId
        let ch = interaction.channel
    
    
        
       })
    }
    if(member){
if(!member.includes(interaction.member.id))return interaction.reply({content:`** انت لست مسؤول التذكرة لعدم الاستلام**`, ephemeral:true })

    
await interaction.message.edit({embeds:[
      new MessageEmbed()
  
  .setColor(data.color)
  
.setAuthor(interaction.guild.name , interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`# - ${data.title} Rules Support・قوانين الدعم الفني

- **ممنوع الاستهبال في الدعم الفني ** 
** __ You can't joking in the ticket __ **

- ** ممنوع تفتح تكت لغرض الاستهبال ** 
** __  You can't open the Ticket to joke __** 

- ** ممنوع الازعاج بالمنشن (في حال لم يتم الرد ، يسمح لك منشن الدعم الفني مره واحده فقط ** 
** لرتبة <@&1156713154798174340> **
** __ You can't disturb others with mentioning them , You can mention the support for once __ **

- ** ممنوع طرح الأسئلة الي ما تخص السيرفر ك طلب كرديت و الخ . .**
** __ You can't ask questions what's not connected with server __ **


** يمكنك حل جميع المشاكل يلي تواجهك في السيرفر عن طريق الدعم الفني**
** __ You can Solve all of  your problems in the server in ticket for support __**`)
  .setImage(`https://media.discordapp.net/attachments/1285582176007753842/1285960492157898822/7e738d79bd8698ce-1.png?ex=67029509&is=67014389&hm=ffcdea27308f2e3ede0feafc52da5097b443e941a499960f383632ef897592d7&`) .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
      .setFooter({text : `${data.foot}`})
  
], components:[row]
                        }).then(async x => {


  let support = client.config.supportId
let ch = interaction.channel  
  
  ch.setName("ticket-unclaimed")



let point = db.get(`points_${interaction.guild.id}`);
let ary = {
  user: `${interaction.member.id}`,
  points: 1
};

if (!point) {
  db.set(`points_${interaction.guild.id}`, [ary]);
} else {
  let found = point.find(x => x.user === interaction.member.id);
  if (found) {
    found.points -= 1; // Increment the points by 1
    point[point.indexOf(found)] = found;
  } else {
    point.push(ary); // If user not found, add them with 1 point
  }
  db.set(`points_${interaction.guild.id}`, point);



    
}
  db.delete(`ownerticket_${interaction.channel.id}`)
                        })
    }
    
   } 
                                 })

//////

client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "ledarbord")){

    let high = client.config.high
    
if(!message.member.roles.cache.some((role) => role.id === high)) return message.reply({embeds: [permissions] } )
    

let pointData = db.get(`points_${message.guild.id}`);

if (pointData) {
  // Sort the data based on points in descending order
  pointData.sort((a, b) => b.points - a.points);

  // Create a leaderboard message
  let leaderboardMessage = `\n`;
  
  for (let i = 0; i < pointData.length; i++) {
    leaderboardMessage += `${i + 1} - <@${pointData[i].user}>  |  ${pointData[i].points}\n`;
  }

  // Send the leaderboard message
  // (You might need to adapt this part depending on your Discord library)

  let embed = new MessageEmbed()
  .setTitle("Leaderboard Tickets")
  .setDescription(`
  ** ${leaderboardMessage}**`)
  .setColor(data.color)
  .setAuthor(message.guild.name , message.guild.iconURL({ dynamic: true }))
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
   //   .setFooter({text : ``})
  
  message.reply({embeds: [embed]});
} else {
  message.reply("No data found for the leaderboard.");
}
 

    
  }
})


client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "points")){

  let support = client.config.supportId
    
if(!message.member.roles.cache.some((role) => role.id === support)) 
  
return message.reply({embeds: [permissions]} )
    
let pointData = db.get(`points_${message.guild.id}`);

    
  let vale = pointData.find(x => x.user === message.author.id);
  
  if(!vale)return message.reply(`لا تمتلك نقاط`)
    let embed = new MessageEmbed()
    .setTitle(`${data.title} Points System`)
   .addField(`**الاداري**`, `<@${vale.user}>`)
.addField(`**عدد التكتات**`, `** ${vale.points}\n**`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
     // .setFooter({text : ` `})
.setColor(data.color)
  await  message.reply({embeds: [embed]})
    
   }
 })




/////

client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "reset user")){
    
let high = client.config.high
    
if(!message.member.roles.cache.some((role) => role.id === high))  
return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const user = message.mentions.users.first() || client.users.cache.get(args[1]);

    if (!user) return message.reply("*mention a user*");

///


    let point = db.get(`points_${message.guild.id}`);
let ary = {
  user: `${user.id}`,
  points: 0
};

if (!point) {
  db.set(`points_${message.guild.id}`, [ary]);
} else {
  let found = point.find(x => x.user === user.id);
  if (found) {
    found.points = 0; // Increment the points by 1
    point[point.indexOf(found)] = found;
  } else {
    point.push(ary); // If user not found, add them with 1 point
  }
  db.set(`points_${message.guild.id}`, point);


await message.reply(`✅ ** تم تصفير نقاط الشخص بنجاح**`)
    

    
   }
   }

})



client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "set points")){
    
let high = client.config.high
if(!message.member.roles.cache.some((role) => role.id === high))
return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const args3 = parseInt(args[3]); // Parse the third argument as an integer
    
    const user = message.mentions.users.first() || client.users.cache.get(args[1]);

    if (!user) return message.reply("*mention a user*");
if (isNaN(args3)) return message.reply(`*the number was not placed successfully*`)
///ا
 

    let point = db.get(`points_${message.guild.id}`);
let ary = {
  user: `${user.id}`,
  points: args3
};

if (!point) {
  db.set(`points_${message.guild.id}`, [ary]);
} else {
  let found = point.find(x => x.user === user.id);
  if (found) {
    found.points = args3; // Increment the points by 1
    point[point.indexOf(found)] = found;
  } else {
    point.push(ary); // If user not found, add them with 1 point
  }
  db.set(`points_${message.guild.id}`, point);


await message.reply(`** ✅ تم وضع عدد النقاط بنجاح **`)
    

    
   }
   }

})


///////////

client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "reset all")){
    
let high = client.config.high
if(!message.member.roles.cache.some((role) => role.id === high)) 
return;

let data = db.get(`points_${message.guild.id}`)
if(!data)return message.reply(`** No Found Data ! **`)
    if(data) db.delete(`points_${message.guild.id}`)
  return message.reply(`**✅ تم تصفير النقاط بنجاح **`)
  
  }
     })
    


client.on('channelDelete', (channel) => {
  let chid = channel.id
  let data = db.get(`ownerticket_${chid}`)
  if(!data)return;
  if(data) db.delete(`ownerticket_${chid}`)

});



client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix + "help points")){
let high = client.config.high
  if(!message.member.roles.cache.some((role) => role.id === high)) return 
    await message.reply({embeds: [
      new MessageEmbed()
      .setColor(data.color)
    .setTitle("System Points Help")
.setDescription(`
- ${prefix}points 
- ${prefix}set points
- ${prefix}reset
- ${prefix}leaderboard
- ${prefix}reset user
`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //.setTimestamp();
    //  .setFooter({text : ` S`})
      .setAuthor(message.guild.name , message.guild.iconURL({ dynamic: true }))
    ]})
   } 
 })



