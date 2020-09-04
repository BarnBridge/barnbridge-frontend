FROM node:12.18 AS build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --verbose

FROM nginx:stable-alpine

RUN apk update && \
    apk add nodejs

COPY --from=build /build/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

CMD ["nginx", "-g", "daemon off;"]