FROM node:16
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
RUN npm install typescript
RUN npm install tsc -g
RUN npm run tsc
USER node
CMD npm start