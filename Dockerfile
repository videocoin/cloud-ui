FROM node:8-alpine as builder
RUN apk add build-base git libc6-compat openssh-client
RUN apk upgrade libcurl

COPY . /ui
WORKDIR /ui
RUN npm install -g create-react-app react-scripts react-app-rewired
RUN make build-bin

FROM nginx:1.11.8-alpine
COPY --from=builder /ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]