FROM ubuntu

RUN apt update

# remove -y and " run docker build . " . You'll understand why it's added
RUN apt-get -y install nodejs

RUN apt-get -y install npm

WORKDIR /SMART-MEETING-ORGANIZER

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT npm start





