FROM node:23-alpine as builder

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# -------------------------------------------------------------------

FROM nginx:latest

EXPOSE 5173
COPY ./nginx/default.conf etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
