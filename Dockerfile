FROM jenkinsci/blueocean

MAINTAINER Johanna Iivanainen "jii@kth.se"

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1

# Expose port 8000 in the container
EXPOSE 8000
