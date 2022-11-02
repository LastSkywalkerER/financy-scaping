FROM node 

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install 

COPY . .

ENV PORT "5000"
ENV BCRYPT_ROUNDS "10"
ENV JWT_SECRET "JWT_SECRET"
ENV DATABASE_URL "postgres://postgres:root@127.0.0.1:5432/qa-api"
ENV DATABASE_URL_TEST "postgres://postgres:root@127.0.0.1:5432/qa-api-test"

EXPOSE $PORT

RUN yarn build
RUN npm i -g pm2

CMD ["pm2-runtime", "dist/main.js", "--name", "qa-api"]