FROM node:16

WORKDIR /back/gerenciamento-aglomeracoes/

COPY package*.json ./
RUN npm install 
COPY . .

# Inicializa a aplicação

EXPOSE 3030

CMD ["npm", "start"]