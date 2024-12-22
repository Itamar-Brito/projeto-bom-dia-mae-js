const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const schedule = require('node-schedule');

// Inicializa o cliente do WhatsApp
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

// Evento que gera e exibe o QR Code
client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo para conectar:');
    qrcode.generate(qr, { small: true });
});

// Evento que é disparado quando o cliente está pronto
client.on('ready', () => {
    console.log('Cliente conectado e pronto para enviar mensagens!');

    // Número de telefone no formato internacional sem caracteres especiais
    const number = '555180318844'; // Formato correto para WhatsApp
    const chatId = `${number}@c.us`;

    // Lista de mensagens variadas
    const messages = [
        'Bom dia! 🌞 Deus Abençoe seu dia! ☕❤️',
        'Bom dia! Bora para cima 🚀💪',
        'Bom dia! 🌟 Que seu dia seja abençoado! 😊✨',
        'Ei, acorda! 🐓 Bra pra cima! Bom dia! ☕🌍',
        'Bom diaaa! 🎉 Hoje é o dia perfeito para fazer algo incrível! Te amo! 💥🙌',
        'Bom dia! 😎 Espero que seu dia seja tão maravilhoso, Te amo! 💖🌸'
    ];

    // Enviar uma mensagem logo que o cliente estiver pronto
    const initialMessage = "Bom dia ☕❤️!";
    console.log(`Enviando mensagem inicial para ${number}: "${initialMessage}"`);
    client.sendMessage(chatId, initialMessage)
        .then(() => {
            console.log(`Mensagem inicial enviada com sucesso para ${number}: "${initialMessage}"`);
        })
        .catch(err => {
            console.error('Erro ao enviar mensagem inicial:', err);
        });

    // Agenda a tarefa para enviar mensagem diariamente às 8h
    schedule.scheduleJob('0 11 * * *', () => { // Alterado para horário UTC (ajuste conforme necessário)
        console.log('Agendando envio de mensagem diária...');
        const message = messages[Math.floor(Math.random() * messages.length)]; // Seleciona uma mensagem aleatória
        console.log(`Mensagem aleatória selecionada: "${message}"`);

        // Envia a mensagem
        console.log(`Enviando mensagem para ${number}: "${message}"`);
        client.sendMessage(chatId, message)
            .then(() => {
                console.log(`Mensagem enviada com sucesso para ${number}: "${message}"`);
            })
            .catch(err => {
                console.error('Erro ao enviar mensagem:', err);
            });
    });
});

// Evento que é disparado em caso de falha na autenticação
client.on('auth_failure', (msg) => {
    console.error('Falha na autenticação:', msg);
});

// Evento que é disparado quando o cliente é desconectado
client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    console.log('Reinicializando o cliente...');
    client.initialize(); // Tenta reconectar automaticamente
});

// Inicializa o cliente
console.log('Inicializando o cliente do WhatsApp...');
client.initialize();
