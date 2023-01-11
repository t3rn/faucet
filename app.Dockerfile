FROM node:18-alpine

# Fix for error:03000086:digital envelope routines::initialization error
# https://medium.com/the-node-js-collection/node-js-17-is-here-8dba1e14e382#5f07
ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV PORT=3000

WORKDIR /app
COPY app/ .
RUN npm install
RUN chown -R node:node /app

USER node

CMD npm run start
