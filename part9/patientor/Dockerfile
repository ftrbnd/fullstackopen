FROM node:18 as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ENV VITE_API_BASE_URL=/api
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html