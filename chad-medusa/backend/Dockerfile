FROM node:19.1.0

WORKDIR /app/medusa

COPY ../package.json . 

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@8.1.0

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install --loglevel=error

COPY . .

RUN chmod +x develop.sh

ENTRYPOINT ["./develop.sh", "develop"]
