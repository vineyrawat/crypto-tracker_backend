FROM ubuntu:18.04
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y \
    nodejs \
    npm
RUN npm i -g yarn
COPY . ./
EXPOSE 5000
ENTRYPOINT ["yarn", "start"]
