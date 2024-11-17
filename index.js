const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');
const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const cfonts = require('cfonts')
const moment = require('moment-timezone')
const speed = require('performance-now')
const os = require('os')

const token = '7635547787:AAF5ZPeOUz9RjFPmQP7RETVlqttCZqZ96JE';
const bot = new TelegramBot(token, { polling: true });


var { pinterest, getBuffer, fetchJson, ping } = require('./lib/funcoes.js');
const { igdl } = require('./lib/igdl.js');
const { color } = require('./lib/color');
const { YTNomeSearch } = require('./lib/youtoba')
var { menu, nsfw, sfw } = require('./menu.js');
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./lib/youtube");

const prefix = "/";
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
let timestamp3 = speed()
let latensi3 = speed() - timestamp3
let latensi = speed() - timestamp3
neww = performance.now()
oldd = performance.now()
uptime = process.uptime()

const nomeBot = "Nodz Bot";
const master = `
Informações do criador:
Telegram: t.me/@GiulianNT
WhatsApp: wa.me/5517997285572
Youtube: @giulianbandeira
`;

const banner = cfonts.render(("NODZ|BOT"), {
font: "block",
align: "center",
gradient: ["magenta","red"]
}) 

console.log(banner.string)
console.log(chalk.green(master));
console.log("Bot Online");

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const pushname = msg.from.first_name;
  const messageText = msg.text ? msg.text.trim() : '';
  const body = messageText || ''; 
  const args = body.split(/ +/).slice(1);
  const isCmd = body.startsWith(prefix);
  var q = args.length ? args.join(" ") : '';
  const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;

if(!isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMENSAGEM\x1b[1;37m]', time, color('CMD'), 'de', color(pushname), 'name :', color(q))
if(isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mCOMANDO\x1b[1;37m]', time, color('Message'), 'de', color(pushname), 'args :', color(command))

  try {
    switch (command) {

// Comando /menu para enviar o menu apenas uma vez
case "menu":
case 'start': {
  // Envia o menu com os botões
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔊 PLAY', callback_data: 'play' }],
        [{ text: '🕵🏻‍♂️ DONO 🕵🏻‍♂️', callback_data: 'button3' }],
        [{ text: '🖼 WALLPAPER', callback_data: 'wallpaper' }],
        [{ text: '🎮 JOGOS', callback_data: 'games' }]
      ]
    }
  };

  // Envia a imagem com o menu, somente uma vez
  bot.sendPhoto(chatId, `https://pomf2.lain.la/f/y2vi1ego.jpg`, {
    caption: menu(prefix, pushname, os, latensi, date, hora, nomeBot),
    ...keyboard
  });
  break;
}
case 'ping': {

try {
teks = `┏━━━━𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗢𝗘𝗦━━━━━
┃╭──────────────
┃│ ᴠᴇʟᴏᴄɪᴅᴀᴅᴇ:
┃│ ${latensi3.toFixed(4)}
┃│ ᴅᴀᴛᴀ : ${date} 
┃│ ʜᴏsᴛ : luminacloud.com.br
┃│ ᴜꜱᴜᴀʀɪᴏ: ${pushname}
┃╰──────────────
┗━━━━━━━━━━━━━━━━━━━`

bot.sendMessage(chatId, teks);
  } catch (error) {
console.error("Erro:", error.message); }
break
}

case 'play': {

var audio = await YTNomeSearch(q);
var teks = `
TITULO: ${audio.title}
CANAL: ${audio.channel}
DURAÇÃO: ${audio.duration}
VISUALIZAÇÕES: ${audio.views}
LANÇAMENTO: ${audio.publishedDate}
`
const keyboard = {
reply_markup: {
inline_keyboard: [
[{ text: '🔊 AUDIO 🔊', callback_data: `yt-audio ${audio.urlOriginal}` }, { text: '🔊 VIDEO 🔊', callback_data: `yt-video ${audio.urlOriginal}` }], ],},};

bot.sendPhoto(chatId, `${audio.thumb}`, { caption: teks, ...keyboard });
break;
}


case 'play2': {
if (!args.length) return bot.sendMessage(chatId, "Coloque o nome do vídeo ou o link do YouTube...");
bot.sendMessage(chatId, "Enviando...");

try {

var q = args.length ? args.join(" ") : '';
var audio = await YTNomeSearch(q);
var audioUrl = audio.url;

// GAMBIARRA PRA BAIXAR O ÁUDIO 
var response = await axios.get(audioUrl, { responseType: 'arraybuffer' });

// GAMBIARRA PRA SALVAR O ÁUDIO KKK
var audioFileName = `${q}.mp3`;
var audioFilePath = `./downloads/${audioFileName}`;

fs.writeFileSync(audioFilePath, response.data);

bot.sendAudio(chatId, audioFilePath, {
title: `${audio.title}`,
performer: `${audio.channel}`
});
} catch (error) {
console.error(error);
bot.sendMessage(chatId, "Erro ao buscar o vídeo."); }
break;
}

case 'igdl': {
if (!args.length) {
return bot.sendMessage(chatId, "Coloque o nome do vídeo ou o link do Instagram..."); }

bot.sendMessage(chatId, "Enviando...");

try {
var q = args.length ? args.join(" ") : '';
var instavideo = await igdl(q); 

// GAMBIARRA PRA BAIXAR O VÍDEO      
var videoUrl = instavideo.dados[0].link;
var response = await axios.get(videoUrl, { responseType: 'arraybuffer' });

if (!response.data || response.data.length === 0) {
    throw new Error("O conteúdo do vídeo está vazio. Verifique o link de download.");
}

// VERIFICAÇÃO DE DIRETÓRIO 
var path = './downloads';
if (!fs.existsSync(path)) {
fs.mkdirSync(path);
}

// GAMBIARRA PRA SALVAR O VÍDEO KKK
var videoFileName = `${Math.floor(Math.random() * 1000)}.mp4`;
var videoFilePath = `${path}/${videoFileName}`;

fs.writeFileSync(videoFilePath, response.data);


if (fs.existsSync(videoFilePath) && fs.statSync(videoFilePath).size > 0) {

bot.sendVideo(chatId, videoFilePath, {
caption: `🏕 Olá ${msg.from.first_name}, aqui está seu vídeo 🎲`,
contentType: "video/mp4",
});
} else {
bot.sendMessage(chatId, "Erro ao processar o vídeo. O arquivo está vazio ou não foi gerado corretamente."); }
} catch (error) {
console.error(error);
bot.sendMessage(chatId, "Erro ao buscar o vídeo. Tente novamente mais tarde."); }
break;
}

case 'wallpaper': {
const wallpaperData = JSON.parse(fs.readFileSync('./lib/wallpaper.json', 'utf-8'));

const randomIndex = Math.floor(Math.random() * wallpaperData.length);
const wallpaperUrl = wallpaperData[randomIndex];
bot.sendPhoto(chatId, wallpaperUrl, { caption: `Aqui está o seu wallpaper.`})
break }
      
case 'gerarnick': {
try {
var q = args.length ? args.join(" ") : '';
const response = await fetch(`https://amy-api.online/api/fazernick?nome=${q}&apikey=giu`);
const data = await response.json();

let txt = '💈Nicks Gerados Com Sucesso!💈\n\n';
data.forEach(nick => {
txt += `🔮 ${nick}\n`;
});
bot.sendMessage(chatId, txt);
} catch (error) {
console.error(error);
bot.sendMessage(chatId, "Erro ao gerar nicks.");
}
break;
}

case 'promote': {
let userId;
let userName;

if (msg.reply_to_message) {
userId = msg.reply_to_message.from.id;
userName = msg.reply_to_message.from.first_name || "Usuário";
} else if (args.length > 0) {
const mentionedUser = msg.entities?.find((entity) => entity.type === 'mention');
if (mentionedUser) {
userId = mentionedUser.user.id;
userName = mentionedUser.user.first_name || "Usuário";
} else {
userId = args[0];
userName = "Usuário (ID)";
}
}

if (!userId) {
bot.sendMessage(chatId, "❌ Por favor, responda à mensagem do usuário ou mencione o usuário que deseja promover.");
break;
L}

try {

bot.promoteChatMember(chatId, userId, {
can_change_info: true,
can_delete_messages: true,
can_invite_users: true,
can_restrict_members: true,
can_pin_messages: true,
can_promote_members: false,
is_anonymous: false,
});

bot.sendMessage(chatId, `✅ O usuário ${userName} foi promovido a administrador com sucesso.`);
} catch (error) {
console.error("Erro ao promover usuário:", error);
bot.sendMessage(chatId, "❌ Ocorreu um erro ao tentar promover o usuário. Certifique-se de que o bot possui permissões administrativas suficientes.");
}
break;
}

case 'demote': {
if (!msg.reply_to_message) {
bot.sendMessage(chatId, "❌ Por favor, use este comando respondendo à mensagem do usuário que deseja remover do cargo.");
break;
}

try {

const userId = msg.reply_to_message?.from?.id;
const userName = msg.reply_to_message?.from?.first_name || "Usuário";

if (!userId) {
bot.sendMessage(chatId, "❌ Não foi possível identificar o usuário.");
break;
}

bot.promoteChatMember(chatId, userId, {
can_change_info: false,
can_delete_messages: false,
can_invite_users: false,
can_restrict_members: false,
can_pin_messages: false,
can_promote_members: false,
is_anonymous: false,
});

bot.sendMessage(chatId, `✅ O usuário ${userName} teve o cargo de administrador removido com sucesso.`);
} catch (error) {
console.error("Erro ao rebaixar usuário:", error);
bot.sendMessage(chatId, "❌ Ocorreu um erro ao tentar remover o cargo de administrador.");
}
break;
}

case 'groupid': {
bot.sendMessage(chatId, `🆔 O ID deste grupo é: ${chatId}`);
break
}

// APENAS IFS ABAIXO
default:
if(isCmd) {
bot.sendMessage(chatId, 'Comando não reconhecido. Tente /start ou /info.'); }
}
} catch (error) {
console.error("Erro ao processar a mensagem:", error);
bot.sendMessage(chatId, "Ocorreu um erro ao processar a sua solicitação.");
  }
});

// SISTEMA QUE RESPONDE AOS BOTÕES CALLBACK
bot.on('callback_query', async (callbackQuery) => {

const data = callbackQuery.data;
const chatId = callbackQuery.message.chat.id; 
const pushname = callbackQuery.message.chat.first_name; 

switch (true) {
    
case data.startsWith('yt-audio'): { 
var q = data.split(" ")[1];

if (!q) {
bot.sendMessage(chatId, "❌ URL de áudio não fornecida.");
break;
}

try {
bot.sendMessage(chatId, "🎶 Baixando o áudio, por favor aguarde...");

var audio = await ytDonlodMp3(q);
var audioUrl = audio.link;

if (!audioUrl) {
bot.sendMessage(chatId, "❌ Não foi possível obter o link de áudio.");
break;
}

// VERIFICAÇÃO DE DIRETÓRIO 
if (!fs.existsSync('./downloads')) {
fs.mkdirSync('./downloads');
}

// GAMBIARRA PRA BAIXAR O ÁUDIO 
var response = await axios.get(audioUrl, { responseType: 'arraybuffer' });

// GAMBIARRA PRA SALVAR O ÁUDIO KKK
var audioFileName = `audio_${Math.floor(Math.random() * 1000)}.mp3`;
var audioFilePath = `./downloads/${audioFileName}`;
fs.writeFileSync(audioFilePath, response.data);

await bot.sendAudio(chatId, audioFilePath, {
title: `${audio.título}`,
performer: `${audio.canal}`,
caption: "🎧 Aqui está seu áudio!",
});

// REMOVE O ARQUIVO TEMPORÁRIO
fs.unlinkSync(audioFilePath);
} catch (error) {
console.error("Erro ao processar o comando 'yt-audio':", error);
bot.sendMessage(chatId, "❌ Ocorreu um erro ao processar o áudio. Tente novamente."); }
break;
}
        
case data.startsWith('yt-video'): { 
var q = data.split(" ")[1];

if (!q) {
bot.sendMessage(chatId, "❌ URL de vídeo não fornecida.");
break;
}

try {
bot.sendMessage(chatId, "🎶 Baixando o vídeo, por favor aguarde...");

var audio = await ytDonlodMp4(q);
var audioUrl = audio.link;

if (!audioUrl) {
bot.sendMessage(chatId, "❌ Não foi possível obter o link de vídeo.");
break;
}

// VERIFICAÇÃO DE DIRETÓRIO 
if (!fs.existsSync('./downloads')) {
fs.mkdirSync('./downloads');
}

// GAMBIARRA PRA BAIXAR O VÍDEO 
var response = await axios.get(audioUrl, { responseType: 'arraybuffer' });

// GAMBIARRA PRA SALVAR O VÍDEO KKK
var audioFileName = `video_${Math.floor(Math.random() * 1000)}.mp4`;
const audioFilePath = `./downloads/${audioFileName}`;
fs.writeFileSync(audioFilePath, response.data);

await bot.sendVideo(chatId, audioFilePath, { caption: `🎧 Aqui está seu vídeo!`,
    contentType: "video/mp4",
                });

// REMOVE O ARQUIVO TEMPORÁRIO
fs.unlinkSync(audioFilePath);
} catch (error) {
console.error("Erro ao processar o comando 'yt-video':", error);
bot.sendMessage(chatId, "❌ Ocorreu um erro ao processar o vídeo. Tente novamente."); }
break;
}

case data === 'button2': {
bot.sendMessage(chatId, menu(prefix, pushname, os, latensi, date, hora, nomeBot), {
reply_markup: { inline_keyboard: [[{ text: 'MENU', callback_data: 'mennu' }]] }});
break;
}

case data === 'button1': {
bot.sendMessage(chatId, nsfw(prefix, nomeBot, pushname), {
reply_markup: { inline_keyboard: [[{ text: 'MENU', callback_data: 'mennu' }]] }});
break;
}

case data === 'button3': {
bot.sendMessage(chatId, master, {
reply_markup: { inline_keyboard: [[{ text: 'MENU', callback_data: 'mennu' }]] }});
break;
}

case data === 'mennu': {
bot.sendMessage(chatId, menu(prefix, pushname, os, latensi, date, hora, nomeBot), {
reply_markup: { inline_keyboard: [
[{ text: 'TESTE', callback_data: 'button1' }, { text: 'TESTE', callback_data: 'button2' }],
[{ text: '🕵🏻‍♂️ DONO 🕵🏻‍♂️', callback_data: 'button3' }],
]}});
break;
}

default: {
bot.sendMessage(chatId, "❓ Comando não reconhecido.");
break;
}
}
});

// SISTEMA DE BEM VINDO
bot.on('guildMemberAdd', async (member) => {

// COLOQUE O ID DO CANAL QUE VOCÊ QUER ATIVAR O BEM VINDO
const welcomeChannelId = '1002294113114';

const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) {
        console.error("Canal de boas-vindas não encontrado");
        return;
    }

const username = member.user.username;
const api = `https://amy-api.online/welcome2?nome=${encodeURIComponent(username)}&perfil=${encodeURIComponent(member.user.displayAvatarURL({ format: 'jpeg' }))}&grupo=Sorteio%20e%20informa%C3%A7%C3%B5es&apikey=giu`;

try {

const response = await axios.get(api, { responseType: 'arraybuffer' });
const buffer = Buffer.from(response.data, 'binary');

channel.send({
content: `Bem-vindo(a), ${username}! Estamos felizes em ter você conosco no servidor. Aproveite e divirta-se! 🎉`,
files: [{ attachment: buffer, name: 'welcome-image.jpeg' }]
});
} catch (error) {
console.error("Erro ao obter a imagem de boas-vindas:", error);
channel.send(`Bem-vindo(a), ${username}! Estamos felizes em ter você conosco no servidor. Aproveite e divirta-se! 🎉`);
    }
});


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(color(`Atualizado= ${__filename}`,'red'))
	delete require.cache[file]
	require(file)
})