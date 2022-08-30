# Building the code
FROM node:14.15.1 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production

FROM node:14.15.1
WORKDIR /usr/app
COPY package*.json ./

RUN npm install --Production

COPY --from=builder /usr/app/dist ./dist
COPY dev.env .
COPY test.env .
COPY migrations /usr/app/migrations
COPY database.json .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 8080
CMD node dist/src/server.js