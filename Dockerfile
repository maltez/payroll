FROM node:18-alpine3.14

WORKDIR ./app
COPY . .
RUN npm install
ENTRYPOINT ["npm"]
CMD ["run", "start:dev"]