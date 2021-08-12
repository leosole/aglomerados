FROM node:14

WORKDIR /aglomerados/front

COPY package*.json ./

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "serve"]
