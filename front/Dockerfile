FROM node:14

WORKDIR /aglomerados/front

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
