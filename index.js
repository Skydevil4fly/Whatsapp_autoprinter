const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const client = new Client({
    authStrategy: new LocalAuth()
});

const userFiles = {}; // Store last received file per user

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
});

client.on('message', async message => {
    const cmd = message.body.trim().toLowerCase();
    const sender = message.from;

    // Handle media file without command
    if (message.hasMedia && !cmd.startsWith('print')) {
        const media = await message.downloadMedia();
        const ext = media.mimetype.split('/')[1] || 'bin';
        const filePath = path.join(__dirname, `file_${sender.replace(/[^a-zA-Z0-9]/g, '')}.${ext}`);
        fs.writeFileSync(filePath, media.data, 'base64');
        userFiles[sender] = filePath;
        message.reply('✅ File received. Now send a command like print2d or print1s to print.');
        return;
    }

    // Handle command message (with or without media)
    if (cmd.startsWith('print')) {
        let numCopies = 1;
        let duplexMode = 'simplex';

        if (/^print\d[d|s]$/.test(cmd)) {
            numCopies = parseInt(cmd[5]);
            duplexMode = cmd[6] === 'd' ? 'duplex' : 'simplex';
        } else if (cmd === 'print') {
            numCopies = 1;
            duplexMode = 'simplex';
        } else {
            message.reply('❓ Invalid command. Use print2d, print1s, or just print.');
            return;
        }

        let filePath;

        if (message.hasMedia) {
            const media = await message.downloadMedia();
            const ext = media.mimetype.split('/')[1] || 'bin';
            filePath = path.join(__dirname, `file_${sender.replace(/[^a-zA-Z0-9]/g, '')}.${ext}`);
            fs.writeFileSync(filePath, media.data, 'base64');
        } else if (userFiles[sender]) {
            filePath = userFiles[sender];
        } else {
            message.reply('⚠️ No file to print. Please send a document or image first.');
            return;
        }

        const sumatraPath = `"C:\\Users\\jhenk\\AppData\\Local\\SumatraPDF\\SumatraPDF.exe"`;
        const sumatraCmd = `${sumatraPath} -print-to-default -print-settings "${numCopies}x" ${duplexMode === 'duplex' ? '-print-settings duplex' : ''} "${filePath}"`;

        const logMessage = (status) => {
            const logLine = `[${new Date().toISOString()}] ${status} - ${filePath}\n`;
            fs.appendFileSync('log.txt', logLine);
        };

        exec(sumatraCmd, (err) => {
            if (err) {
                const fallbackCmd = `Start-Process -FilePath "${filePath}" -Verb Print`;
                exec(fallbackCmd, (fallbackErr) => {
                    if (fallbackErr) {
                        message.reply('❌ Print failed.');
                        logMessage('❌ Fallback failed');
                    } else {
                        message.reply(`✅ Printed with fallback (${numCopies}x, ${duplexMode}).`);
                        logMessage('✅ Fallback success');
                        delete userFiles[sender];
                        fs.unlinkSync(filePath);
                    }
                });
            } else {
                message.reply(`✅ Printed (${numCopies}x, ${duplexMode}).`);
                logMessage('✅ Sumatra success');
                delete userFiles[sender];
                fs.unlinkSync(filePath);
            }
        });
    }
});
client.initialize();
