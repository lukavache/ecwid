FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD [ "node", "build/index.js" ]