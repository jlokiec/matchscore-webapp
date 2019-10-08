FROM node:lts-alpine
WORKDIR /usr/matchscore
COPY . .
RUN npm install --silent
CMD ["npm", "start"]
