FROM node:11.12.0-alpine
RUN apk --update add libpng-dev
ADD wait-for-postgres.sh /app/
WORKDIR /app
RUN echo "unsafe-perm = true" >> ~/.npmrc
RUN npm install -g strapi@alpha
COPY ./ ./
CMD ["npx", "strapi", "start"]
