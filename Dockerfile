FROM node:20.17.0-alpine3.20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


FROM node:20.17.0-alpine3.20 as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

COPY --from=build /app/nest-cli.json ./
COPY --from=build /app/tsconfig*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
