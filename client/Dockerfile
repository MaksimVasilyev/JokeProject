FROM node:latest
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000



