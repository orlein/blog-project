FROM node:lts-alpine
WORKDIR /app
RUN npm install -g strapi@alpha
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN chmod 777 ./wait-for-mongo.sh
CMD ["npm", "run", "start"]