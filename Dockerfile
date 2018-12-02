FROM node:10-alpine

RUN npm install -g nodemon@1.14.7
RUN npm install -g heroku
RUN npm install -g firebase-tools

RUN mkdir -p /skill
WORKDIR /

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

VOLUME /skill/functions/node_modules

ENTRYPOINT ["sh","/entrypoint.sh"]