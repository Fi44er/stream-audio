FROM node:latest

WORKDIR /user_svc

COPY . .

RUN yarn install

EXPOSE 3001

CMD npx prisma migrate dev --name init \
    && yarn start