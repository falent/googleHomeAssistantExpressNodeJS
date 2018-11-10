FROM node:slim

RUN apt-get update && apt-get install -y \
    wget

RUN npm install -g nodemon@1.14.7

COPY package.json /skill/package.json

RUN mkdir -p /skill/
WORKDIR /skill/
RUN npm install


RUN wget https://raw.githubusercontent.com/falent/googleHomeAssistantExpressNodeJS/master/entrypoint.sh /skill/
RUN chmod +x /skill/entrypoint.sh

ENTRYPOINT ["sh","/skill/entrypoint.sh"]
