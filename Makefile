.NOTPARALLEL:

GOOS?=linux
GOARCH?=amd64

CONSUL_ADDR?=127.0.0.1:8500

PROJECT?=videocoin-network
APP_NAME?=cloud-ui
VERSION?=$$(git describe --abbrev=0)-$$(git rev-parse --short HEAD)

DOCKER_REGISTRY?=gcr.io/${PROJECT}
IMAGE_TAG=${DOCKER_REGISTRY}/${APP_NAME}:${VERSION}

.PHONY: deploy build

default: build

version:
	@echo ${VERSION}

image-tag:
	@echo ${IMAGE_TAG}

build:
	docker build -t ${IMAGE_TAG} -f Dockerfile .

build-bin:
	@echo "==> Building..."
	yarn
	yarn run build

push:
	@echo "==> Pushing ${APP_NAME} docker image..."
	docker push ${IMAGE_TAG}

release: build push

deploy:
	cd deploy && ./deploy.sh WORKSPACE=${WORKSPACE} PROJECT=${PROJECT} VERSION=${VERSION}