FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
