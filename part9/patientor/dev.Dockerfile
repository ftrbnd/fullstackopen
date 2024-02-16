FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 5173
CMD npm rebuild esbuild && npm run dev