FROM node:latest
WORKDIR /front-app
COPY . /front-app
RUN npm install 
CMD ["npm", "run", "start"]
