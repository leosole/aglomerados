FROM node:16

WORKDIR /front

# ENV PATH /front/node_modules/.bin:$PATH

COPY package.json /front/package.json
COPY . /front
RUN npm install 

# Inicializa a aplicação

EXPOSE 3000

CMD ["npm", "start"]
