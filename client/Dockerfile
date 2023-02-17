# Use an existing docker image as a base
FROM node:14-alpine 

WORKDIR /app

# Downloaad and install a dependency
COPY ./package.json ./
RUN npm install 
COPY ./ ./

# Tell the image what to do when it starts as container
CMD ["npm", "start"]