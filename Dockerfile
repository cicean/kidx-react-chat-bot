FROM library/node

RUN ["mkdir", "kidxbot"]

WORKDIR /kidxbot

COPY . .

RUN npm install

CMD ["npm", "start"]


