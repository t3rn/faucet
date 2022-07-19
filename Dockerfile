FROM ubuntu:20.04

WORKDIR /app

RUN echo "install nginx"
RUN apt-get update
RUN apt-get install -y nginx curl

RUN echo "install nodesource"
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN echo "install npm and nodejs"
RUN apt-get install -y nodejs

RUN echo "copy in app directory"
COPY app/ /app/
RUN cd /app/ && npm install
RUN cd / && npm run build --prefix app

RUN echo "built app files to faucet dir"
RUN mkdir -p /var/www/faucet/
RUN cp -r /app/build/* /var/www/faucet/

RUN echo "copy in api directory"
RUN mkdir -p /opt/t0rn-faucet-api/
COPY api/ /api/
RUN rm -rf /opt/t0rn-faucet-api/node_modules

RUN echo "built api files to api dir"
RUN rm -rf /api/node_modules
COPY /api/* /opt/t0rn-faucet-api/

#RUN echo "copy in api secret"
#COPY /api/.secret.json /opt/t0rn-faucet-api/.secret.json

RUN npm ci --prefix /opt/t0rn-faucet-api
CMD [ "/usr/bin/npm", "start", "--prefix", "/opt/t0rn-faucet-api"]
#CMD [ "/usr/bin/node-template", "--dev" ]

