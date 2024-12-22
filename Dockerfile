# Use uma imagem oficial do Node.js
FROM node:18

# Instale as dependências do Chromium necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxss1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libdrm2 \
    libgbm1 \
    libxcb-shm0 \
    libxkbcommon0 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o container
COPY package*.json ./
COPY index.js ./

# Instale as dependências do Node.js
RUN npm install

# Exponha a porta que o aplicativo pode usar (se necessário)
# EXPOSE 3000

# Comando para rodar o bot
CMD ["npm", "start"]
