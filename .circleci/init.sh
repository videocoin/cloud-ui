#!/bin/bash
SCRIPT=${BASH_SOURCE[0]}
DIR=$(dirname ${BASH_SOURCE[0]})

export PATH=$PATH:./google-cloud-sdk/bin:/tmp

export GCLOUD_PROJECT=videocoin-network
export ENV=snb
export CLUSTER=snb

if [ "$CIRCLE_BRANCH" == "master" ]; then
    export GCLOUD_PROJECT=videocoin-network
    export ENV=snb
    export CLUSTER=snb
    source ${DIR}/../envs/sandbox
fi

if [ "$CIRCLE_BRANCH" == "develop" ]; then
    export GCLOUD_PROJECT=videocoin-network
    export ENV=dev
    export CLUSTER=dev
    source ${DIR}/../envs/develop
fi

if [ "$CIRCLE_BRANCH" == "k2" ]; then
    export GCLOUD_PROJECT=videocoin-k2
    export ENV=k2
    export CLUSTER=k2
    source ${DIR}/../envs/k2
fi
