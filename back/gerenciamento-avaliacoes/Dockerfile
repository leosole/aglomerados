FROM node:16

WORKDIR /back/gerenciamento-avaliacoes/

COPY package*.json ./
RUN npm install 
COPY . .

# Inicializa a aplicação

EXPOSE 3040

CMD ["npm", "start"]