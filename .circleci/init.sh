#!/bin/bash
SCRIPT=${BASH_SOURCE[0]}
DIR=$(dirname ${BASH_SOURCE[0]})

export PATH=$PATH:./google-cloud-sdk/bin:/tmp

export GCLOUD_PROJECT=videocoin-network
export ENV=snb
export CLUSTER=snb

export REACT_APP_VC_API_URL=/api/v1/
export REACT_APP_VC_TXLOG_API_URL=https://txlog.dev.kili.videocoin.network/api/v1

if [ "$CIRCLE_BRANCH" == "sandbox" ]; then
    export GCLOUD_PROJECT=videocoin-network
    export ENV=snb
    export CLUSTER=snb
fi

if [ "$CIRCLE_BRANCH" == "develop" ]; then
    export GCLOUD_PROJECT=videocoin-network
    export ENV=dev
    export CLUSTER=dev
fi