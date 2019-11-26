GOOS?=linux
GOARCH?=amd64

GCP_PROJECT?=videocoin-network

NAME=ui
ENV?=dev

VERSION=$$(git describe --abbrev=0)-$$(git rev-parse --abbrev-ref HEAD)-$$(git rev-parse --short HEAD)

.PHONY: deploy build

default: build

version:
	@echo ${VERSION}

build:
	yarn run build

deps:
	yarn
	cd src/ui-kit && yarn && cd -


docker-build:
	docker build -t gcr.io/${GCP_PROJECT}/${NAME}:${VERSION} -f Dockerfile .

docker-push:
	docker push gcr.io/${GCP_PROJECT}/${NAME}:${VERSION}

release: docker-build docker-push

deploy:
	ENV=${ENV} deploy/deploy.sh

