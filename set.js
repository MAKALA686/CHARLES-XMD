const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUVTaXZVamxRWnEwYTdRLzJaZmQ1bU8wY215UU1ybWFjSzl5WkV0S05uMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDJoM1NUQWhPQjhwdFNEc2MwcmhPeEE0ZmFPbW0wUUgwaGc2N1NiSHRIbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTVU3VkRvYWh5cEg5OGlYazlBQlRic3J6enF3VVNSY0ZFZnZCSXByR21jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnaHR3Y0N1VDgvMlFPdno0aWlBY3U0WUJ5bldLcTZkaFVVaUJ5a0dtTVdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPd0RkanJwU21MeXZlT1JQWGc1RUVLZDFGem51dFZVMVNsRTFqZXkyRkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLQW9JSHBxbEYwQml2NzdENFpmYjBKRVlwUXpMdmw5bnpTSyt4OS9mMW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUFIc0ZTQWpuTXcyTUgvbEpPUDdHV1pYV3N2SnF0VzJ6VFAvamFkSkdubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTZKVUlOb0x0WjVLL2U5NTl5UTBCRVFyS1RZS0crVktMWnFzbFRwcFZHdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRsanJYKzg0Z3dpNGo2VDE4cmM5cWlUbkcxNmk2ZlkvbDR2TnhZL2piUlNWR21WNUZhM0V6dmhleDBTNDN1dWVReEFXN0hrWjBhdGhBUXE5YlhPc0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkwLCJhZHZTZWNyZXRLZXkiOiJRTkV2Uk5ySVBMVUxRa2hHdDVnSzk4V29EVHVERHp4ZHBuY1Zadk16aXZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ3NDk0MTA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNDRThCODI4QTc4NjFEMUU5M0EwQkZEQTg1Qzc1RTNEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2NDgyODd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ3NDk0MTA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE2QkYxQTkzRjdERjU0QzVGNDY5NzBFMTk0RjQ2RjZBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2NDgyOTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ3NDk0MTA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJCOUNCOEI2OEJCRTcyMkMyRkEzNTREMkUzN0M4ODYxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2NDgzMjZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiI1MDk0NzQ5NDEwNTo1OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwk4OgIPCdlbjwnZW08J2VtvCdlazwnZWw8J2Vt/Cdlb7wnZW68J2VuSDgvIYgLiIsImxpZCI6IjY0NjUyNzI5OTE3NTYzOjU4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnFabTk4RUVNcVUzY01HR0FvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRXUvSHNFNFRSY2tKTEJZdFU1TFgzb2dnRmlFb0FUOHl1ZWVhK2JTeDAyOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSkYvV3JmVHI2TGVyYndtTjQzK1VYN0dZMG1WRU9IdFc3L0NyakVUaUhKRUFzSG9pWFMxeFFDdWlpTEw3a0J3bjkxeC9NZTdIWlMwNXYvNWNGdHJEQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IlRGL0YvRFlNeWJEeTV6ZVhZQ0R4YmxpQ3NUWWwzS0FBWllQWE9MdEN6YUJ2N1lQNDl3amFxVEx2TGtjVEFORHZ2Rzl6ZlR0bDh3ZGxsK3lGN1dhUkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5NDc0OTQxMDU6NThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkx2eDdCT0UwWEpDU3dXTFZPUzE5NklJQlloS0FFL01ybm5tdm0wc2ROdiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNjQ4Mjc4LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1IZCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𓃠 𝕸𝕴𝕶𝕬𝕰𝕷𝕾𝕺𝕹 ༆ .",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "50947494105",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
