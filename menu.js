function menu(prefix, pushname, os, latensi, date, hora, nomeBot) {
return `
┏━━━━𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗢𝗘𝗦━━━━━
┃╭──────────────
┃│ ᴠᴇʟᴏᴄɪᴅᴀᴅᴇ:
┃│ ${latensi.toFixed(4)}
┃│ ᴅɪsᴘᴏsɪᴛɪᴠᴏ: ${os.platform()}
┃│ ᴅᴀᴛᴀ : ${date} 
┃│ ʜᴏsᴛ : render.com
┃│ ᴜꜱᴜᴀʀɪᴏ: ${pushname}
┃╰──────────────
┗━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━
┃╭──────────────
┃│${prefix}play (txt)
┃│${prefix}play2 (txt)
┃│${prefix}igdl (link)
┃│${prefix}ping
┃│${prefix}wallpaper
┃╰──────────────
┗━━━━━━━━━━━━━━━━━━━
`
}

function sfw(prefix, nomeBot) {
return `
em breve...
`
}

function nsfw(prefix, nomeBot) {

return `
em breve...
`
}

module.exports = {
menu,
nsfw,
sfw
}
