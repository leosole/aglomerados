FROM strapi/base:14

ENV NODE_ENV production

WORKDIR /app

COPY favicon.ico .

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY public/robots.txt public/

COPY extensions/ extensions/

COPY api/ api/

COPY config/ config/

# RUN yarn build

EXPOSE 1337

CMD ["yarn", “start”]

