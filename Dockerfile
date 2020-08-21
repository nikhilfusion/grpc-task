FROM node:12-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./ /app/
RUN npm install -g react-scripts
RUN which react-scripts
CMD ["node", "server.js"]