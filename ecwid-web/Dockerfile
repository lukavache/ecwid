FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
RUN npm install express

COPY . ./

RUN npm run build

EXPOSE 4000

CMD ["node", "server.ts"]
