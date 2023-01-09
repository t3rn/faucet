FROM node:18-alpine

WORKDIR /app
COPY api/ .
RUN npm install

CMD npm run start
