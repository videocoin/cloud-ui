FROM node:14.4-alpine3.11 as builder

RUN apk add build-base git libc6-compat openssh-client python
RUN apk upgrade libcurl

ARG REACT_APP_CLOUD_API_URL
ARG REACT_APP_TXLOG_API_URL
ARG REACT_APP_PAYMENTS_API_URL
ARG REACT_APP_STRIPE_KEY

COPY . /ui
WORKDIR /ui
RUN make deps && make build


FROM nginx:1.11.8-alpine

COPY --from=builder /ui/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
