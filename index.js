const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const schedule = require('node-schedule');

// Inicializa o cliente do WhatsApp
const client = new Client();

client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo para conectar:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente conectado e pronto para enviar mensagens!');

    // Agenda a tarefa para enviar mensagem diariamente às 8h
    schedule.scheduleJob('0 8 * * *', () => { // Hora no formato 24h (UTC)
        const number = '55XXXXXXXXXX'; // Substitua pelo número da sua mãe
        const message = 'Bom dia! 🌞❤️ Tenha um ótimo dia!';
        const chatId = `${number}@c.us`;

        // Envia a mensagem
        client.sendMessage(chatId, message)
            .then(() => console.log(`Mensagem enviada para ${number}`))
            .catch(err => console.error('Erro ao enviar mensagem:', err));
    });
});

client.on('auth_failure', (msg) => {
    console.error('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

// Inicializa o cliente
client.initialize();
