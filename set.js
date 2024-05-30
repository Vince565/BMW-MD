const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic09mS29wc1MzanFZdVY4Y2h3MUtZc1JyY1A3NjlmbFIvaEdjcVpvRngzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDlvckh1Rzl4Z0dVRnI1eDNmcXlvYUlIckJnQkhMcVBTdEhxTWNwN0lTcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSDIvLzlkVTVHM0o4SFJtbmVrN2N0VWRaZUZmYm1qc29KdGpScm9zVmtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwSDg3aC9GQlFMVmRzOVowQlZvQWMvQkFvK2pFUzFHZExETHlDZFdPUlJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEeVlsL1BPK2toOEFaQjhKZUJrNEc2N0VydHpqOU1VV2pFa2EzdmxvV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxSZ3BkdEwxUndxRzNhRmVGMlhVRzkyby81alV3L2tKclkxejFUVW95bTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RTVld6andtOUZpcDJ3WlFNQlh3UHduZVQ3VWJvV2UvNlR0MkJlZ1NFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXF0NFRUMmt1dEcvcEFEN3ZqekliQkV1eEE3VHBPaHpGamMrM0hIU05Rdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSN2xVQkFyTHFGR3RBNHFOZ0RQd0E5WTIwOS9VOXBuc2pqa3NLTWR5WkFVTUdJQTNRaldvd1VhM0pyYjY5aU9NQnMvc0IvQjdVMlM1Z3dRQ25GbGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJIYUtKdFNLQys3V2xwRGVDZ09FdVRHWVRja0h1RTA0dzRrTDJFQTlxdExjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwODA3MTA4ODlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRUU0REY5QkZCQjUxRTc3MTA1OUZBRDdCOEQwQzYxNkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNzA4Mjk1OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA4MDcxMDg4OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5QzI5RkU5ODlGRjUyODdBNDJBQkQxMzY5OTM2NzkyOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE3MDgyOTYwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqZFZmQ2xNdFE0YVpvTjJIRmhSalJRIiwicGhvbmVJZCI6ImEyOTA5N2I0LWE3YmUtNGVjMi1hNjY0LTE2NWM0MzY2YTk5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSmJ1bE1wRjM1ek5kRkoxcGVubUlMTW9QWU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN040dDBhZ05YMjQ1S1VqY0NMaWpoeFZhVTJnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNFQ0EyS1dWIiwibWUiOnsiaWQiOiIyMzQ4MDgwNzEwODg5OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4bSgyarJtOG0hOG0hy14In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKT1AzcFFERUwrMjRySUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJxSkxIdXU3VjZtTkpGbC9KSUFyQVBjVVZ3OWFXSmV2WXZSTzdDOHljSDNFPSIsImFjY291bnRTaWduYXR1cmUiOiJQTGtNS3pNdzRjNU10QnU0TGZwZFl1Z1N6Mk04bUZEY21VMkc1U01OZnBmTkdYN1VZV256TWhKV0NQRGwxaTJ3c0dKSlRBZXU2SVBiZkltNWZ4aTJEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid0dqd0hvRFlPbmhHcGtNY3FDcW9TTDdlcFUyNzNWVkltUDdGc1NBQ3Iwc3RaM0xYRS9pWnlwMlJVZVBnMVJKY2ZrYmpWL2JEQW9xYlRkWDlZeTRKaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDgwNzEwODg5OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYWlTeDdydTFlcGpTUlpmeVNBS3dEM0ZGY1BXbGlYcjJMMFR1d3ZNbkI5eCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNzA4Mjk1NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIV0IifQ==',
    PREFIXE: process.env.PREFIX || "-",
    OWNER_NAME: process.env.OWNER_NAME || "VINCE-X,
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348069918096",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'VINCE-X,
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

