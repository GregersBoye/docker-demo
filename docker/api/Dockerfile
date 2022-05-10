FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./node/package.json .

RUN npm install && npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./node/src ./src

EXPOSE 3001
CMD [ "nodemon", "index.js" ]
