FROM node:18-alpine

WORKDIR /app
COPY api/ .
RUN npm install
RUN chown -R node:node /app

USER node

CMD npm run start
