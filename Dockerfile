FROM node:12.18 AS build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build --verbose

FROM nginx:stable-alpine

COPY --from=build /build/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
