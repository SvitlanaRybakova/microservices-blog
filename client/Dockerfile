# Use an existing docker image as a base
FROM node:14-alpine 

ENV CI=true
ENV WDS_SOCKET_PORT=0
WORKDIR /app

# Downloaad and install a dependency
COPY package.json ./
RUN npm install 
COPY ./ ./

# Tell the image what to do when it starts as container
CMD ["npm", "start"]