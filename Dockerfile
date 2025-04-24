FROM node:20-alpine

WORKDIR /app

# app/ klasörü olmadığından direkt package.json'ı kopyala
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3100
CMD ["node", "dist/main"]