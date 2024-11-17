FROM node:18

WORKDIR /app

COPY package*.json ./

COPY docker/entrypoint.sh /app/docker/entrypoint.sh

RUN dos2unix /app/docker/entrypoint.sh && chmod +x /app/docker/entrypoint.sh

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["docker/entrypoint.sh"]

CMD [ "npm", "run", "start:dev" ]