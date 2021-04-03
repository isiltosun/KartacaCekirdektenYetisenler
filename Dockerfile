FROM node:lts-alpine

WORKDIR /opt/app

COPY . /opt/app

RUN apk add yarn

RUN yarn install

RUN yarn build

CMD ["yarn", "start"] 