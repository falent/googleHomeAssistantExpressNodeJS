FROM node:10-alpine

RUN apk update && \
    apk upgrade && \
    apk add git

RUN npm install -g nodemon
RUN npm install -g heroku
RUN npm install -g firebase-tools

RUN mkdir -p /skill
WORKDIR /

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

VOLUME /skill/functions/node_modules

CMD ["sh","/entrypoint.sh"]