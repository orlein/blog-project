FROM node:11.12.0-alpine
RUN apk --update add postgresql-client
RUN apk --update add libpng-dev
ADD wait-for-postgres.sh /app/
WORKDIR /app
COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY ./ ./
COPY wait-for-postgres.sh ./wait-for-postgres.sh
RUN chmod 777 ./wait-for-postgres.sh
CMD ["sh", "./wait-for-postgres.sh", "dummy", "npm run dev"]
