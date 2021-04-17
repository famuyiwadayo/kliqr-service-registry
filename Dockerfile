FROM node:14.16.1-alpine3.10

LABEL AUTHOR github.com/famuyiwadayo

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app 

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . ./

USER node 

EXPOSE 3219

CMD ["yarn", "run", "start"]

