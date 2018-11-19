FROM node:slim

RUN apt-get update && apt-get install -y dos2unix

RUN npm install -g nodemon@1.14.7

RUN mkdir -p /skill
WORKDIR /

COPY entrypoint.sh /entrypoint.sh

RUN dos2unix /entrypoint.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

RUN chmod +x /entrypoint.sh

VOLUME /skill/node_modules

ENTRYPOINT ["sh","/entrypoint.sh"]