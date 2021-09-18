FROM node:14

WORKDIR /back/gerenciamento-usuario

COPY package*.json ./
RUN npm install 
COPY . .

# Inicializa a aplicação

EXPOSE 1337

CMD ["npm", "strapy","start"]