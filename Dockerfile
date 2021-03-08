# Download image
FROM node:14-alpine

WORKDIR /usr/src/

# Install dependecies
COPY ./backend/package*.json /usr/src/
RUN npm install

# Copy application to docker
COPY ./backend /usr/src/

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
