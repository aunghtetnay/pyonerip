FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache git && \
    yarn install --production && \
    apk del git && \
	apk add wget && apk add ffmpeg

COPY . .

CMD ["yarn", "start"]

