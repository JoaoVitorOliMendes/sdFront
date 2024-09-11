FROM node:18-alpine

WORKDIR /nodejs_jwt_auth

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "start"]