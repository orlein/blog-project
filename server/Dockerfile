FROM node:11.12.0-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "prod"]
