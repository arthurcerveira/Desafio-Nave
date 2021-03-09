# Download image
FROM node:14-alpine

WORKDIR /usr/src/

# Install dependecies
COPY ./package*.json ./
RUN npm install

# Copy application to docker
COPY ./backend ./

# 'ash' replaces 'bash' in alpine containers
ENTRYPOINT [ "/bin/ash" ]

# "wait-for" starts node container after PostgreSQL is set-up
CMD [ "./wait-for", "db:5432", "--", "npm", "start"] 
